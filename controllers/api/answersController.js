const db = require("../../models");
const router = require("express").Router();
const Op = require("sequelize").Op;

/**
 * Answer - Read All scores where id is userID (for grading particular user)
 */
router.get("/averageScore/:id", function (req, res) {
  db.Answer.findAll({
    where: {
      UserId: req.params.id
    }
  })
    .then(dbModel => {
      res.json(dbModel);
    })
    .catch(err => res.status(422).json(err));
});

/**
 * Answer - Find by ID
 */
router.get("/currentUser", function (req, res) {
  console.log("userId", req.user.id);
  db.Answer.findAll({ where: { UserId: req.user.id } })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Answer - Read All
 */
router.get("/", function (req, res) {
  db.Answer.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.get("/fiveDayAnswers", function (req, res) {
  //create dates for to define day ranges for scores we want to gather. This code is NOT dry, but it works!
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1, 0, 0);
  var yesterday = new Date();
  yesterday.setDate(today.getDate() - 1, 0, 0);
  var twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2, 0, 0);
  var threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 3, 0, 0);
  var fourDaysAgo = new Date();
  fourDaysAgo.setDate(today.getDate() - 4, 0, 0);
  var fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(today.getDate() - 5, 0, 0);
  //get all answers from four days ago to (and including) today
  db.Answer.findAll({
    where:
    {
      UserId: req.user.id,
      createdAt: {
        [Op.between]: [fiveDaysAgo, tomorrow]
      }
    }
  })
    .then(scores => {
      const fiveDayAnswers = []; //empty array that will be filled with average score for each day
      //getDayAverage gets average score for a day range
      function getDayAverage(start, end) {
        let total = 0;
        let dayAnswers = scores.filter(answer => answer.createdAt > start && answer.createdAt < end)
        let dayScores = dayAnswers.map(answer => answer.answer_score);
        dayScores.forEach(score => total += score);
        if (dayScores.length === 0) {
          fiveDayAnswers.push({date: start, score: "no score"});
        }
        else {
          let averageScore = (total / dayScores.length);
          fiveDayAnswers.push({date: start, score: averageScore});
        }
      }
      //call getDayAverage on the past 5 days
      getDayAverage(yesterday, tomorrow);
      getDayAverage(twoDaysAgo, today);
      getDayAverage(threeDaysAgo, yesterday);
      getDayAverage(fourDaysAgo, twoDaysAgo);
      getDayAverage(fiveDaysAgo, threeDaysAgo);
      res.json(fiveDayAnswers);
    })
    .catch(err => res.status(422).json(err));
});


//Route to get average scores for each user.
router.get("/playerScore", function (req, res) {
  db.User.findAll({ include: [db.Answer] })

    .then(usersWithAnswers => {
      const filteredUsers = usersWithAnswers.filter(User => User.Answers !== null);
      const leaderboard = filteredUsers.map(User => {
        let totalScore = 0;
        User.Answers.forEach(answer => {
          totalScore += answer.answer_score;
        });
        switch (User.Answers.length) {
          case 0:
            return { username: User.username, averageScore: totalScore / 1, rank: 1 };
          default:
            return { username: User.username, averageScore: totalScore / User.Answers.length, rank: 1 };
        }
      });
      const sortedLeadeboard = leaderboard.sort(
        (a, b) => b.averageScore - a.averageScore
      );
      let rankNum = 1;
      sortedLeadeboard.forEach(user => {
        user.rank = rankNum;
        rankNum++;
      });
      res.json(sortedLeadeboard);
    })
    .catch(err => res.status(422).json(err));
});

/**
 * Answer - Read One
 */

router.get("/:id", function (req, res) {
  db.Answer.findByPk(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Answer - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", async function (req, res) {
  var correctAnswer = await db.Question.findByPk(req.body.QuestionId).get("answer");
  var denominator;
  if (req.body.user_response > correctAnswer) {
    denominator = req.body.user_response;
  } else {
    denominator = correctAnswer;
  }
  var score = 100 * (1 - (Math.abs(req.body.user_response - correctAnswer)) / denominator);
  console.log(score);
  db.Answer.create({
    UserId: req.user.id,
    answer_score: score,
    ...req.body
  })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;

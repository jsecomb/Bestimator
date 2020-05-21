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
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1, 0, 0);
  var fourDaysAgo = new Date();
  fourDaysAgo.setDate(today.getDate() - 4, 0, 0);
  db.Answer.findAll({
    where:
    {
      UserId: req.user.id,
      createdAt: {
        [Op.between]: [fourDaysAgo, tomorrow]
      }
    }
  })
  .then(scores => {
    let answerScores = scores.map(answer => answer.answer_score);
    let total = 0;
    answerScores.forEach(score => total += score);
    let averageScore = total/answerScores.length;
    res.json(averageScore);
  })
  .catch(err => res.status(422).json(err));
});


//Route to get average scores for each user.
router.get("/playerScore", function (req, res) {
  db.User.findAll({ include: [db.Answer] })

    .then(usersWithAnswers => {
      const filteredUsers = usersWithAnswers.filter(User => User.Answers !== null);
      console.log(filteredUsers);
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

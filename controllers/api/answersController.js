const db = require("../../models");
const router = require("express").Router();

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
  db.Answer.findAll({ where: {UserId: req.user.id }})
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



//Route to get average scores for each user.
router.get("/playerScore", function (req, res) {
  console.log("please")
  db.User.findAll({include: [db.Answer]})

    .then(usersWithAnswers => {
      const leaderboard = usersWithAnswers.map(User => {
        let totalScore = 0;
        User.Answers.forEach(answer => {
          totalScore += answer.answer_score;
        });
        return {username: User.username, averageScore: totalScore / User.Answers.length};
      });
      const sortedLeadeboard = leaderboard.sort(
        (a, b) => b.averageScore - a.averageScore
      );
      console.log(sortedLeadeboard);
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

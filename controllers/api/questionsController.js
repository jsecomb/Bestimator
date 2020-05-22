const db = require("../../models");
const router = require("express").Router();
const Op = require("sequelize").Op;

/**
 * Question - Read All
 */
router.get("/", function (req, res) {
  var today = new Date();
  today.setDate(today.getDate());
  today.setHours(0,0,0,0);
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1, 0, 0);
  tomorrow.setHours(0,0,0,0);
  db.Answer.findAll({
    where:
    {
      UserId: req.user.id,
      createdAt: {
        [Op.between]: [today, tomorrow]
      }
    }
  }).then(answers => {
    db.Question.findAll({
      limit: 5 - answers.length,
      order: db.sequelize.random()
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });
});

/**
 * Question - Read One
 */
router.get("/:id", function (req, res) {
  db.Question.findAll({
    where: {
      id: req.params.id
    }
  }).then(function (Question) {
    res.json(Question);
  });
});

module.exports = router;

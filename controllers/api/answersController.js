const db = require("../../models");
const router = require("express").Router();

/**
 * Answer - Read All
 */
router.get("/", function (req, res) {
  db.Answer.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Answer - Read One
 */
router.get("/:id", function (req, res) {
  db.Answer.findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Answer - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", function (req, res) {
  db.Answer.create({
    UserId: 1,
    ...req.body
  })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
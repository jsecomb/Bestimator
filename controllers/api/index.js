const router = require("express").Router();
// Import our controllers
const userRoutes = require("./usersController");
const questionRoutes = require("./questionsController");
const answerRoutes = require("./answersController");

// Hook up to the router
router.use("/users", userRoutes);
router.use("/questions", questionRoutes);
router.use("/answers", answerRoutes);

// Export the router
module.exports = router;

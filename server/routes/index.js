const express = require("express");
const router = express.Router();
const questionRouter = require("./questionRouter");
const answerRouter = require("./answerRouter");
const commentRouter = require("./commentRouter");
router.get("/", (req, res) => {
  res.send("welcome");
});
router.use("/question", questionRouter);
router.use("/answer", answerRouter);
router.use("/comment", commentRouter);

module.exports = router;

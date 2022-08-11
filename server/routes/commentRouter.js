const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();
router.post("/:id", async (req, res) => {
  const { comment, user } = req.body;
  try {
    const newComment = await new Comment({
      comment,
      question_id: req.params.id,
      user,
    });
    await newComment.save();
    res.status(201).send({
      status: true,
      data: newComment,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: false,
      message: "Error adding comment",
    });
  }
});
router.get("/", (req, res) => {
  res.send("welcome");
});

module.exports = router;

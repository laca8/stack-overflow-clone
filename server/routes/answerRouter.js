const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
router.post("/", async (req, res) => {
  const { answer, question_id, user } = req.body;
  try {
    const newAnswer = await new Answer({
      answer,
      question_id,
      user,
    });
    await newAnswer.save();
    res.status(201).send({
      status: true,
      data: newAnswer,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: false,
      message: "Error adding answer",
    });
  }
});
router.get("/", async (req, res) => {});

module.exports = router;

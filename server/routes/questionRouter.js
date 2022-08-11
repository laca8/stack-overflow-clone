const express = require("express");
const { default: mongoose } = require("mongoose");
const Question = require("../models/Question");
const router = express.Router();
router.post("/", async (req, res) => {
  const { title, body, tags, user } = req.body;
  try {
    const question = await new Question({
      title,
      body,
      tags,
      user,
    });
    await question.save();
    res.status(201).send({
      status: true,
      data: question,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: false,
      message: "Error adding question",
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const questions = await Question.aggregate([
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                comment: 1,
                created_at: 1,
                user: 1,
              },
            },
          ],
          as: "comment",
        },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                answer: 1,
                created_at: 1,
                user: 1,
              },
            },
          ],
          as: "answer",
        },
      },
    ]);
    res.status(200).send(questions);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: false,
      message: "Error Questions not found",
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                comment: 1,
                created_at: 1,
                user: 1,
              },
            },
          ],
          as: "comment",
        },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                answer: 1,
                created_at: 1,
                user: 1,
              },
            },
          ],
          as: "answer",
        },
      },
    ]);
    res.status(200).send(question);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: false,
      message: "Error  question not found",
    });
  }
});

module.exports = router;

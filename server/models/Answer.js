const mongoose = require("mongoose");
const answerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
  answer: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
  },
});
module.exports = mongoose.model("answer", answerSchema);

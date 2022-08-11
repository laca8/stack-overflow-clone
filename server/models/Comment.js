const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  comment: String,

  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
});
module.exports = mongoose.model("comment", commentSchema);

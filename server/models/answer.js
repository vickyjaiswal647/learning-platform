const mongoose = require("mongoose");
const User = require("./user");
const Question = require("./question");
const answerSchema = new mongoose.Schema(
  {
    testName: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      // type: String,
      ref: "Question",
    },
    answer: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const answer = mongoose.model("answer", answerSchema);

module.exports = answer;

const mongoose = require("mongoose");
const Question = require("./question");
const User = require("./user");

const testSchema = new mongoose.Schema(
  {
    testName: {
      type: String,
      required: true,
    },
    testCode: {
      type: String,
      required: true,
    },
    totalQuestions: {
      type: String,
      required: true,
    },
    attemptableQuestion: {
      type: String,
      required: true,
    },
    testTime: {
      type: String,
    },
    isActive: {
      type: String,
    },
    semester: {
      type: String,
      required: true,
    },
    allQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    attemptedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    branch: {
      type: String,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const newTest = mongoose.model("newTest", testSchema);

module.exports = newTest;

const newTest = require("../models/newTest");
const Question = require("../models/question");
const commonResponses = require("../components/response/commonResponse");
const AttemptTest = require("../models/attemptTest");
const Viedo = require("../models/viedos");
const User = require("../models/user");
const Subject = require("../models/subject");
const Answer = require("../models/answer");
const {
  checkSubject,
  checkAnswer,
} = require("./inputValidations/studentValidations");

const Joi = require("@hapi/joi");

module.exports.getRandomQuiz = async function (req, res) {
  try {
    let pageNo = req.params.pageNo;
    const activeTest = await newTest.findOne({
      isActive: 1,
      semester: req.user.semester,
      branch: req.user.branch,
    });
    if (activeTest == null) {
      return commonResponses.someMessage(res, "No Test is available for you");
    }
    let isAttempted = await AttemptTest.findOne({
      testCode: activeTest.testCode,
      user: req.user._id,
    });
    if (isAttempted != null) {
      return commonResponses.someMessage(
        res,
        "You have already attempted this Test"
      );
    }
    let test = await newTest
      .findOne({ semester: req.user.semester, isActive: 1 }, { _id: 0 })
      .select(
        "allQuestions attemptableQuestion totalQuestions testName testCode"
      )
      .populate(
        "allQuestions",
        "qStatement option1 option2 option3 option4 correctAnswer type"
      );

    if (test == null)
      return commonResponses.someMessage(
        res,
        "There is no test available for you"
      );
    // let questionList = [];
    // let isVisited = [];
    // for (var i = 0; i < test.attemptableQuestion; i++) {
    //   isVisited[i] = false;
    // }

    // let mcqQuestions = [];
    // for (let i = 0; i < test.allQuestions.length; i++) {
    //   if (test.allQuestions[i].type == 1) {
    //     mcqQuestions.push(test.allQuestions[i]);
    //   }
    // }
    // var count = Number(0);
    // while (count < test.attemptableQuestion) {
    //   let randomIndex = Math.floor(Math.random() * test.attemptableQuestion);
    //   if (isVisited[randomIndex] == false) {
    //     isVisited[randomIndex] = true;
    //     questionList.push(mcqQuestions[randomIndex]);
    //     count = count + 1;
    //   }
    // }
    //console.log(test[pageNo],test.allQuestions[pageNo]);
    let ans = await Answer.findOne({
      user: req.user._id,
      testName: test.testName,
      questionId: test.allQuestions[pageNo]._id,
    });
    let toSend = {
      quest: test.allQuestions[pageNo],
      totalQuest: test.allQuestions.length,
      testName: test.testName,
      testCode: test.testCode,
    };
    if (ans) {
      toSend.answer = ans.answer;
    }
    return commonResponses.successWithData(res, toSend);
  } catch (error) {
    return commonResponses.internalError(res);
  }
};

module.exports.submitQuiz = async function (req, res) {
  try {
    console.log(req.body, req.user._id);
    let answers = await Answer.find({
      user: req.user._id,
      testName: req.body.testName,
    });
    let correctAnswers = 0;
    for (var i = 0; i < answers.length; i++) {
      let qId = answers[i].questionId;
      var getQuestion = await Question.findById(qId);
      if (
        getQuestion.type == 0 &&
        getQuestion.correctAnswer == answers[i].ans
      ) {
        correctAnswers++;
      }
    }

    const activeTest = await newTest.findOne({
      isActive: 1,
      semester: req.user.semester,
      branch: req.user.branch,
    });

    let attemptedTest = AttemptTest.create({
      user: req.user._id,
      testCode: req.body.testCode,
      testName: req.body.testName,
      testScore: 0,
      branch: req.user.branch,
      semester: req.user.semester,
    });
    console.log(req.body);
    //Updating overall score
    let user = await User.findById(req.user._id);
    user.score = user.score + correctAnswers;
    let updatedUser = await user.save();

    // Updating current test Score
    let currentTestDetail = await AttemptTest.findOne({
      user: req.user._id,
      testCode: req.body.testCode,
    });
    console.log(currentTestDetail);
    if (currentTestDetail) {
      currentTestDetail.testScore = correctAnswers;
      let updatedData = await currentTestDetail.save();
    }
    return commonResponses.successWithString(
      res,
      `Hello! ${user.fullname} test submitted successfully wait for your result`
    );
  } catch (error) {
    console.log(error);
    return commonResponses.internalError(res);
  }
};

module.exports.goToCourse = async function (req, res) {
  try {
    console.log(req.body);
    const { error } = await checkSubject.validateAsync(req.body);
    let allContents = await Viedo.find({
      semester: req.user.semester,
      subject: req.body.data,
    }).select("viedo displayName");
    return commonResponses.successWithData(res, allContents);
  } catch (error) {
    if (error.isJoi == true) {
      return commonResponses.joiError(error, res);
    }
    return commonResponses.internalError(res);
  }
};

module.exports.getSpecificSubjects = async function (req, res) {
  try {
    let allSubjects = await Subject.find({
      branch: req.user.branch,
      semester: req.user.semester,
    }).select("subjectName subjectCode");
    let toSend = [];
    for (var i = 0; i < allSubjects.length; i++) {
      var currentSubject = {
        id: allSubjects[i]._id,
        label: allSubjects[i].subjectName,
        value: allSubjects[i].subjectCode,
      };
      toSend.push(currentSubject);
    }
    return commonResponses.successWithData(res, toSend);
  } catch (error) {
    return commonResponses.internalError(res);
  }
};

module.exports.createAnswer = async function (req, res) {
  try {
    const { error } = await checkAnswer.validateAsync(req.body);
    let ans = await Answer.findOne({
      testName: req.body.testName,
      questionType: req.body.type,
      user: req.user._id,
      questionId: req.body._id,
    });
    if (ans && ans.answer) {
      ans.answer = req.body.ans;
      let updatedAnswer = await ans.save();
    } else {
      let newAnswer = await Answer.create({
        testName: req.body.testName,
        questionType: req.body.type,
        questionId: req.body._id,
        answer: req.body.ans,
        user: req.user._id,
      });
    }
    return commonResponses.successWithString(res, "answer created");
  } catch (error) {
    if (error.isJoi == true) {
      return commonResponses.joiError(error, res);
    }
    return commonResponses.internalError(res);
  }
};

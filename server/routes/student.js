const express = require("express");
const router = express.Router();

const studentController = require("../controller/studentController");
const userController = require("../controller/userController");
router.get(
  "/attempt-test/:pageNo",
  userController.auth,
  studentController.getRandomQuiz
);
router.post("/submit-test", userController.auth, studentController.submitQuiz);
router.post("/go-to-course", userController.auth, studentController.goToCourse);
router.get(
  "/user-subject",
  userController.auth,
  studentController.getSpecificSubjects
);
router.post(
  "/create-answer",
  userController.auth,
  studentController.createAnswer
);
module.exports = router;

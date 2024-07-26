const Subject = require("../models/subject");
const Joi = require("@hapi/joi");
const commonResponses = require("../components/response/commonResponse");

module.exports.getSubjects = async function (req, res) {
  try {
    let branch = req.body.branch;
    let semester = req.body.semester;
    let allSubjects = await Subject.find({
      branch: branch,
      semester: semester,
    });
    return commonResponses.successWithData(res, allSubjects);
  } catch (error) {
    console.log(error);
    return commonResponses.internalError(res);
  }
};

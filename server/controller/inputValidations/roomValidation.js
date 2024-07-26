const Joi = require('@hapi/joi');

const checkCreateRoom = Joi.object({
    roomName: Joi.string().required(),
    isActive: Joi.string().required(),
    semester: Joi.string().required(),
    branch: Joi.string().required(),
})

module.exports = {
    checkCreateRoom 
}
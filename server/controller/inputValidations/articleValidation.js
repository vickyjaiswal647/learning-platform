const Joi = require('@hapi/joi');

const checkCreateArticle = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required(),
})

module.exports = {
    checkCreateArticle
}
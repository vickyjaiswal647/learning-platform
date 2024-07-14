const article  = require('../models/article');
const likes = require('../models/likes')
const Joi = require('@hapi/joi');
const moment = require('moment');
const commonResponses = require('../components/response/commonResponse');
const {checkCreateArticle} = require('./inputValidations/articleValidation');

module.exports.createArticle = async function(req, res){
    try{
        const { error } = await checkCreateArticle.validateAsync(req.body); 
        let articles = await article.findOne({title: req.body.title, user: req.user});
        if(articles) return commonResponses.badRequest(res,'You have already published the article with same heading');
        let newArtcile = await article.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            isApproved: 0
        })
        return commonResponses.created(res, "Artcile created Successfully, Wait for admin consent for article approval");
        
    }catch(error){
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        console.log(error)
        return commonResponses.internalError(res)
    }
}

module.exports.getArticles = async function(req,res){
    try{
        let approved = req.query.approved;
        let queryDetails = {};
        if(approved)
        queryDetails.isApproved = approved;
        let articles = await article.find(queryDetails).select('-__v');
        let response = [];
        for(let i=0;i<articles.length;i++){
            articles[i].createdAt = moment(articles[i].createdAt).format('DD-MM-YYYY');
            let data = {
                "_id": articles[i]._id,
                "title": articles[i].title,
                "content": articles[i].content,
                "category": articles[i].category,
                "isApproved": articles[i].isApproved,
                "createdAt": moment(articles[i].createdAt).format('DD-MM-YYYY'),
                "updatedAt": moment(articles[i].updatedAt).format('DD-MM-YYYY')               
            }
            response.push(data);
        }
        return commonResponses.successWithData(res, response);

    }catch(error){
        return commonResponses.internalError(res)
    }
}

module.exports.singleArticle = async function(req, res){
    try{
        let articleId = req.params.id;
        let articles = await article.findOne({_id:articleId}).select('-__v');
        console.log(req.user)
        let isLiked = await likes.findOne({
            user: req.user._id,
            articleId: articleId
        });
        let likeCounts = await likes.count({
            articleId: articleId
        });
        articles.createdAt = moment(articles.createdAt).format('DD-MM-YYYY');
        let data = {
            "_id": articles._id,
            "title": articles.title,
            "content": articles.content,
            "category": articles.category,
            "isApproved": articles.isApproved,
            "createdAt": moment(articles.createdAt).format('DD-MM-YYYY'),
            "updatedAt": moment(articles.updatedAt).format('DD-MM-YYYY'),
            "hasLiked" : isLiked ? 1 : 0,     
            "likeCount":  likeCounts     
        }
        return commonResponses.successWithData(res, data);
    }catch(error){
        console.log(error)
        return commonResponses.internalError(res)
    }
}

module.exports.changeArticleStatus = async function(req, res){
    try{
        if(req.user.isAdmin == 0) return commonResponses.someMessage(res, "Only admin have privilige for this action");
        let articleId = req.params.id;
        let articles = await article.findOne({_id:articleId}).select('-__v');
        if(articles.isApproved){
            articles.isApproved = false;
        }else articles.isApproved =true;
        let updatedArticle = await articles.save();
        return commonResponses.successWithString(res, "Article Updated");
    }catch(error){
        console.log(error)
        return commonResponses.internalError(res)
    }
}

module.exports.likeArtcile = async function(req, res){
    try{
        let articleId = req.params.id;
        let isLiked = await likes.findOne({
            user: req.user._id,
            articleId: articleId
        });
        if(isLiked){
            let deleteLike = await likes.deleteOne({
                user: req.user._id,
                articleId: articleId
            });
            return commonResponses.successWithString(res, "UnLike Success");

        }else{
            let newLike = await likes.create({
                user: req.user._id,
                articleId: articleId
            });
            return commonResponses.successWithString(res, "Like Success");
        }

    }catch(error){
        console.log(error)
        return commonResponses.internalError(res)
    }
}
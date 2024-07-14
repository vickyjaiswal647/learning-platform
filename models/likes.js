const mongoose = require('mongoose');
const User = require('./user');
const Article = require('./article');
const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    articleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },   
}, {
    timestamps:true
});


const likes = mongoose.model('likes', likeSchema);

module.exports = likes ;
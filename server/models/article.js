const mongoose = require('mongoose');
const User = require('./user')
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    isApproved:{
        type: Boolean,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps:true
});


const article = mongoose.model('article', articleSchema);

module.exports = article;
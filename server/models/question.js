const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    qStatement:{
        type:String,
        required:false,
    },
    type: {
        type:Number,
        required: false 
    },
    option1:{
        type:String,
        required:false,
    },
    option2:{
        type:String,
        required:false,
    },
    option3:{
        type:String,
        required:false,
    },
    option4:{
        type:String,
        required:false,
    },
    correctAnswer:{
        type:String,
        required:false,
    },
    testCode:{
        type:String,
        required:false,
    }   
}, {
    timestamps:true
});


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
const mongoose = require('mongoose');
const User = require('./user')
const attemptTestSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    testCode:{
        type:Number,
        required:true,
    },
    testName: {
        type: String,
        required: true,
      },
    testScore:{
        type:Number,
        required:true,
    },
   
   
}, {
    timestamps:true
});


const AttemptTest = mongoose.model('AttemptTest', attemptTestSchema);

module.exports = AttemptTest ;
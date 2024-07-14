const mongoose = require('mongoose');
const User = require('./user')

const roomSchema = new mongoose.Schema({
    roomName:{
        type:String,
        required:true
    },
    isActive:{
        type:String,
    },
    semester:{
        type:String,
        required:true,
    },
    branch:{
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },   
}, {
    timestamps:true
});


const room = mongoose.model('room', roomSchema);

module.exports = room;
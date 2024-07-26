const room = require('../models/room');
const {checkCreateRoom} = require('./inputValidations/roomValidation')

module.exports.createRoom = async function(req, res){
    try{
        const { error } = await checkSubject.validateAsync(req.body);  
        let newRoom = await room.findOne({room: req.body.room, branch: req.body.branch, semester: req.body.semester});
        if(newRoom) return commonResponses.badRequest(res,'Room Name already existed for this batch');
        newRoom = await room.create({
            roomName: req.body.roomName,
            branch: req.body.branch,
            semester: req.body.semester,
            isActive: 1,
            createdBy: req.user._id
        })
        return commonResponses.created(res, "Room created successfully");
    }catch(error){
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }
}

module.exports.deleteRoom = async function(req, res){
    try{
        let findRoom  = await room.findOne({_id: roomId});
        findRoom.isActive = 0;
        let updatedRoom = await findRoom.save();
        return commonResponses.successWithString(res, "Room deleted successfully");
    }catch(error){
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }
}
const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')
const chatController = require('../controller/chatController');
router.post('/create-room',userController.auth,chatController.createRoom);
router.put('/delete-room', chatController.deleteRoom);
module.exports = router;
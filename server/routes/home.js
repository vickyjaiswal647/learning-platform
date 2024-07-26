const express = require('express');
const router = express.Router();


const homeController = require('../controller/homeController')
const userController = require('../controller/userController');

router.post('/getSubject', userController.auth, homeController.getSubjects);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const articleController = require('../controller/articleController');

router.post('/create', userController.auth, articleController.createArticle);
router.get('/list', userController.auth,articleController.getArticles);
router.get('/getArticle/:id',userController.auth, articleController.singleArticle);
router.put('/changeStatus/:id',userController.auth, articleController.changeArticleStatus);
router.post('/like/:id', userController.auth, articleController.likeArtcile)
module.exports = router;
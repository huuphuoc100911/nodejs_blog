const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const authController = require('../app/controllers/AuthController');

router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.get('/register', authController.register);
router.get('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/search', siteController.search);
router.get('/home', siteController.index);

module.exports = router;

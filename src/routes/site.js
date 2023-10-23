const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const authController = require('../app/controllers/AuthController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/search', siteController.search);
router.get('', siteController.index);

module.exports = router;

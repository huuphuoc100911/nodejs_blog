const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/api/ApiController');

router.get('/account', apiController.getListAccout);
router.post('/account', apiController.postRegisterAccount);
router.put('/account/:id', apiController.changeAccount);
router.delete('/account/:id', apiController.deleteAccount);

module.exports = router;

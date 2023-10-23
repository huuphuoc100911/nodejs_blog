const express = require('express');
const router = express.Router();

// const courseController = require("../app/controllers/CourseController");

router.get('/test', (req, res, next) => {
    res.json('API get');
});

router.post('/test', (req, res, next) => {
    console.log(req.headers);
    res.json(
        'API post ' +
            req.body.username +
            ' ' +
            req.body.password +
            ' ' +
            req.headers.hello,
    );
});

router.put('/test', (req, res, next) => {
    console.log(req.headers);
    res.json(
        'API put ' +
            req.body.username +
            ' ' +
            req.body.password +
            ' ' +
            req.headers.hello,
    );
});

module.exports = router;

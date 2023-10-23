const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');
const courseController = require('../app/controllers/CourseController');

router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);
router.get('/courses/create', courseController.create);
router.post('/courses/store', courseController.store);

module.exports = router;

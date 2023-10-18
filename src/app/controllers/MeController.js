const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongose');
class MeController {
    //Get stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}),
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                    deletedCount,
                }),
            )
            .catch(next);
    }

    trashCourses(req, res, next) {
        Promise.all([
            Course.findWithDeleted({ deleted: true }),
            Course.countDocuments(),
        ])
            .then(([courses, courseCount]) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                    courseCount,
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();

const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongose');
class MeController {
    //Get stored/courses
    storedCourses(req, res, next) {
        // res.json(res.locals._sort);
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([
            courseQuery,
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

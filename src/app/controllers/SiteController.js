const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongose');

class SiteController {
    index(req, res, next) {
        console.log(req.session);
        Course.find()
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();

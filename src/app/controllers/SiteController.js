const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongose');

class SiteController {
    index(req, res, next) {
        Course.find()
            .then((courses) => {
                const loginSuccess = req.flash('success');
                console.log(loginSuccess);
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                    loginSuccess,
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();

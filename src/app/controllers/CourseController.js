const Course = require('../models/Course');
const { mongooseToObject } = require('../../utils/mongose');
class CourseController {
    //Get /courses/:slud
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    //Get /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //Post courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => {
                req.flash('createdSuccess', 'Thêm khóa học thành công');

                res.redirect('/me/stored/courses');
            })
            .catch((error) => {});
    }

    //Get /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
    }

    //PUT /courses/:id/update
    update(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg`;
        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => {
                req.flash('updatedSuccess', 'Cập nhật khóa học thành công');

                res.redirect('/me/stored/courses');
            })
            .catch(next);
    }

    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Delete /courses/:id/delete
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalided!!' });
                break;
        }
    }
}

module.exports = new CourseController();

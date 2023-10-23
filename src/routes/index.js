const coursesRouter = require('./courses');
const siteRouter = require('./site');
const meRouter = require('./me');
const apiRouter = require('./api');
const authMiddleware = require('../app/middlewares/AuthMiddleware');

function route(app) {
    app.use('/api', apiRouter);
    app.use('/me', authMiddleware, meRouter);
    app.use('/courses', coursesRouter);
    app.use('', siteRouter);
}

module.exports = route;

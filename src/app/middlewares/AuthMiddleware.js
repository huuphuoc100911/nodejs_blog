module.exports = function AuthMiddleware(req, res, next) {
    if (!req.session.checkLogin) {
        res.redirect('/login');
    }

    next();
};

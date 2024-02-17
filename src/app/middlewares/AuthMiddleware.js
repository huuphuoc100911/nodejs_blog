var jwt = require("jsonwebtoken");

module.exports = function AuthMiddleware(req, res, next) {
    try {
        var token = req.session.token;
        var checkToken = jwt.verify(token, "check-login");

        if (!checkToken) {
            res.redirect("/login");
        }

        next();
    } catch (error) {
        res.redirect("/login");
    }
};

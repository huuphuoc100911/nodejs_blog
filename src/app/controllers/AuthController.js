const Account = require('../models/Account');
const { multipleMongooseToObject } = require('../../utils/mongose');
var jwt = require('jsonwebtoken');

class AuthController {
    register(req, res, next) {
        res.render('auth/register');
    }

    login(req, res, next) {
        res.render('auth/login');
    }

    logout(req, res, next) {
        req.session.checkLogin = null;

        res.redirect('/login');
    }

    postRegister(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        Account.findOne({
            email: email,
        })
            .then((data) => {
                if (data) {
                    res.render('auth/register', {
                        error: 'Người dùng đã tồn tại',
                    });
                } else {
                    Account.create({
                        email: email,
                        password: password,
                    }).then((data) => {
                        res.redirect('/login');
                    });
                }
            })
            .catch((error) => {
                res.status(500).json('Tạo tài khoản không thành cônga');
            });
    }

    postLogin(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        Account.findOne({
            email: email,
            password: password,
        })
            .then((data) => {
                if (data) {
                    var token = jwt.sign({ _id: data._id }, 'check-login');

                    req.session.userLogin = data;
                    req.session.checkLogin = true;
                    req.session.token = token;

                    res.redirect('/home');
                } else {
                    res.status(300).json('Account không đúng');
                }
            })
            .catch((error) => {
                res.status(500).json('Đăng nhập không thành công');
            });
    }
}

module.exports = new AuthController();

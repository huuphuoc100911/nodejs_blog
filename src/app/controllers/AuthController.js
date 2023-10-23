const Account = require('../models/Account');
const { multipleMongooseToObject } = require('../../utils/mongose');

class AuthController {
    register(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        Account.findOne({
            email: email,
        })
            .then((data) => {
                if (data) {
                    res.json('Tài khoản đã tồn tại');
                } else {
                    Account.create({
                        email: email,
                        password: password,
                    }).then((data) => {
                        res.json('Tạo tài khoản thành công');
                    });
                }
            })
            .catch((error) => {
                res.status(500).json('Tạo tài khoản không thành công');
            });
    }

    login(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        Account.findOne({
            email: email,
            password: password,
        })
            .then((data) => {
                if (data) {
                    res.json('Đăng nhập thành công');
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

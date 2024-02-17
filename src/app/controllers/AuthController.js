const Account = require("../models/Account");
const { multipleMongooseToObject } = require("../../utils/mongose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

class AuthController {
    register(req, res, next) {
        res.render("auth/register");
    }

    login(req, res, next) {
        res.render("auth/login");
    }

    logout(req, res, next) {
        req.session.checkLogin = null;

        res.redirect("/login");
    }

    postRegister = async (req, res, next) => {
        var email = req.body.email;
        var password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);

        Account.findOne({
            email: email,
        })
            .then((data) => {
                if (data) {
                    res.render("auth/register", {
                        error: "Người dùng đã tồn tại",
                    });
                } else {
                    Account.create({
                        email: email,
                        password: hashedPassword,
                    }).then((data) => {
                        res.redirect("/login");
                    });
                }
            })
            .catch((error) => {
                res.status(500).json("Tạo tài khoản không thành công");
            });
    };

    postLogin = async (req, res, next) => {
        const { email, password } = req.body;

        // Find the user by email
        const user = await Account.findOne({ email });
        console.log(user);

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log(passwordMatch);

            if (passwordMatch) {
                var token = jwt.sign({ _id: user._id }, "check-login");

                req.session.userLogin = { userLogin: user };
                req.session.token = token;

                res.redirect("/home");
            } else {
                res.status(300).json("Account không đúng");
            }
        } else {
            res.status(500).json("Đăng nhập không thành công");
        }

        // Account.findOne({
        //     email: email,
        // })
        //     .then((data) => {
        //         if (data) {
        //             var token = jwt.sign({ _id: data._id }, "check-login");

        //             req.session.userLogin = data;
        //             req.session.checkLogin = true;
        //             req.session.token = token;

        //             res.redirect("/home");
        //         } else {
        //             res.status(300).json("Account không đúng");
        //         }
        //     })
        //     .catch((error) => {
        //         res.status(500).json("Đăng nhập không thành công");
        //     });
    };
}

module.exports = new AuthController();

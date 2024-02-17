const Account = require("../../models/Account");
const { multipleMongooseToObject } = require("../../../utils/mongose");
const bcrypt = require("bcrypt");
class ApiController {
    getListAccout(req, res, next) {
        Account.find()
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                res.status(500).json("Lấy thông tin thất bại");
            });
    }

    postRegisterAccount = async (req, res, next) => {
        var email = req.body.email;
        var password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);

        Account.findOne({
            email: email,
        })
            .then((data) => {
                if (data) {
                    res.json("Người dùng đã tồn tại");
                } else {
                    Account.create({
                        email: email,
                        password: hashedPassword,
                    }).then((data) => {
                        res.json("Tạo tài khoản thành công");
                    });
                }
            })
            .catch((error) => {
                res.status(500).json("Tạo tài khoản không thành công");
            });
    };

    changeAccount(req, res, next) {
        Account.updateOne(
            {
                _id: req.params.id,
            },
            req.body
        )
            .then((data) => {
                res.json("Cập nhật người dùng thành công");
            })
            .catch((error) => {
                res.status(500).json("Cập nhật người dùng thành công");
            });
    }

    deleteAccount(req, res, next) {
        Account.delete({
            _id: req.params.id,
        })
            .then((data) => {
                res.json("Xóa người dùng thành công");
            })
            .catch((error) => {
                res.status(500).json("Xóa người dùng thành công");
            });
    }
}

module.exports = new ApiController();

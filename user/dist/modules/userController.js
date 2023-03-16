"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("./userService");
const bcrypt = require("bcryptjs");
const responseConstants_1 = require("../constants/responseConstants");
const utils_1 = require("../helper/utils");
const commonConstants_1 = require("../constants/commonConstants");
const email_verify_html_1 = require("../templates/email-verify.html");
const email_verify_response_html_1 = require("../templates/email-verify-response.html");
const axios_1 = require("axios");
class UserController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.files);
                yield userService_1.default.register(req.body, req.file, req.files);
                return res.status(responseConstants_1.default.STANDARD.SUCCESS).send({
                    message: "User Register Successfully"
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
        this.userList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userService_1.default.userList();
                return res.status(responseConstants_1.default.STANDARD.SUCCESS).send({
                    message: "User List",
                    data: data
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
        this.getUserDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userService_1.default.getUserDetail({ field1: 'user_id=$1' }, { userId: req.params.id });
                return res.status(responseConstants_1.default.STANDARD.SUCCESS).send({
                    message: "User List",
                    data: data.rows
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.files.image);
                yield userService_1.default.updateUser({ query: 'UPDATE USERS SET first_name=$1,last_name=$2,email=$3,image=$4,address=$5,phone_number=$6,address_image=$7 WHERE user_id=$8' }, [req.body.first_name, req.body.last_name, req.body.email, req.files.image, req.body.address, req.body.phone_number, req.files.address_image, req.params.id]);
                return res.status(responseConstants_1.default.STANDARD.SUCCESS).send({
                    message: "User Updated Successfully"
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield userService_1.default.deleteUser(req.user.user_id);
                return res.status(responseConstants_1.default.STANDARD.SUCCESS).send({
                    message: "User Deleted Successfully"
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield userService_1.default.getUserDetail({ field1: 'email=$1' }, { userId: email });
            if (user.rows[0]) {
                if (bcrypt.compareSync(password, user.rows[0].password)) {
                    res.status(responseConstants_1.default.STANDARD.SUCCESS).send({
                        userId: user.rows[0].user_id,
                        firstName: user.rows[0].first_name,
                        lastName: user.rows[0].last_name,
                        email: user.rows[0].email,
                        token: utils_1.default.generateToken({
                            userId: user.rows[0].user_id,
                            email: user.rows[0].email,
                        }),
                    });
                    return;
                }
            }
            res.status(responseConstants_1.default.ERROR401.CODE).send({
                message: commonConstants_1.commonConstants.USER.INVALID_EMAIL
            });
        });
        this.forgetpassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield userService_1.default.getUserDetail({ field1: 'email=$1' }, { userId: req.body.email });
            console.log(user.rows[0]);
            if (!user.rows[0]) {
                return res
                    .status(responseConstants_1.default.ERROR400.CODE)
                    .send({ message: commonConstants_1.commonConstants.USER.INVALID_EMAIL });
            }
            const token = utils_1.default.generateToken({ email: user.rows[0].email, userId: user.rows[0].user_id });
            console.log(token);
            yield userService_1.default.updateUser({ query: 'UPDATE USERS SET tokens=$1 WHERE email=$2' }, [token, req.body.email]);
            const mail = utils_1.default.sendEmail(user.rows[0].email, commonConstants_1.commonConstants.USER.PASSWORD_RESET, (0, email_verify_html_1.default)(token));
            if (mail) {
                return res
                    .status(responseConstants_1.default.STANDARD.SUCCESS)
                    .send({ message: commonConstants_1.commonConstants.USER.PASSWORD_RESET_LINK });
            }
            else {
                return res
                    .status(responseConstants_1.default.ERROR500.CODE)
                    .send({ message: commonConstants_1.commonConstants.USER.SERVER });
            }
        });
        this.emailVerification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = utils_1.default.decodeAuthToken(req.params.token);
                let message = "";
                const user = yield userService_1.default.getUserDetail({ field1: 'user_id=$1' }, { userId: token.data.user_id });
                if (user) {
                    if (!user.token || user.token != req.params.token) {
                        message = commonConstants_1.commonConstants.TOKEN.INVALID_TOKEN;
                    }
                    else {
                        user.token = "";
                        message = commonConstants_1.commonConstants.USER.VERIFIED;
                    }
                    res.write((0, email_verify_response_html_1.default)(message));
                    res.end();
                }
                else {
                    res.write((0, email_verify_response_html_1.default)(commonConstants_1.commonConstants.USER.USER_NOT_FOUND));
                    res.end();
                }
            }
            catch (error) {
                res.write((0, email_verify_response_html_1.default)(commonConstants_1.commonConstants.USER.USER_NOT_FOUND));
                res.end();
            }
        });
        // public resetpassword = async (req, res) => {
        //     try {
        //         const user = await adminService.findUserByID(req.user_id.data._id);
        //         if (user) {
        //             if (!user.token) {
        //                 return res
        //                     .status(401)
        //                     .send({ message: commonConstants.TOKEN.INVALID_TOKEN });
        //             }
        //             user.password = bcrypt.hashSync(req.body.password);
        //             user.token = "";
        //             await user.save();
        //             res
        //                 .status(responseConstants.STANDARD.SUCCESS)
        //                 .send({ message: commonConstants.PASSWORD.PASSWORD_CHANGED });
        //         } else {
        //             res
        //                 .status(responseConstants.ERROR400.CODE)
        //                 .send({ message: commonConstants.USER.USER_NOT_FOUND });
        //         }
        //     } catch (error) {
        //         res
        //             .status(responseConstants.ERROR500.CODE)
        //             .send({ message: commonConstants.SERVER });
        //     }
        // };
        this.productList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productList = yield axios_1.default.get(`${process.env.PRODUCT_URL}/api/v1/product/productList`);
                return res.status(responseConstants_1.default.STANDARD.SUCCESS).send({
                    message: "Data Fetched Successfully",
                    data: productList.data.data
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
        this.productDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productList = yield axios_1.default.get(`${process.env.PRODUCT_URL}/api/v1/product/productDetail?id=${req.query.id}`);
                return res.status(responseConstants_1.default.STANDARD.SUCCESS).send({
                    message: "Data Fetched Successfully",
                    data: productList.data.data
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
        this.updateProductDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productList = yield axios_1.default.put(`${process.env.PRODUCT_URL}/api/v1/product/updateProduct`, {
                    productName: req.body.productName,
                    productType: req.body.productType,
                    productPrice: req.body.productPrice,
                    productQty: req.body.productQty,
                    productId: req.query.Id
                });
                return res.status(responseConstants_1.default.STANDARD.SUCCESS).send({
                    message: "Product Updated Successfully",
                    data: productList.data.data
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map
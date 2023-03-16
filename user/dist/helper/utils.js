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
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const responseConstants_1 = require("../constants/responseConstants");
const userService_1 = require("../modules/userService");
const commonConstants_1 = require("../constants/commonConstants");
const nodemailer = require("nodemailer");
class Utils {
    constructor() {
        this.generateToken = (data) => {
            return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: "24hr" });
        };
        this.decodeAuthToken = (token) => {
            if (token) {
                try {
                    return jwt.decode(token);
                }
                catch (error) {
                    return false;
                }
            }
            return false;
        };
        this.isAuth = () => (req, res, next) => {
            const token = req.header("authorization");
            console.log(token);
            if (token) {
                const JWTtoken = token.slice(7, token.length);
                jwt.verify(JWTtoken, process.env.JWT_SECRET, (err, decode) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        res
                            .status(401)
                            .send({ message: commonConstants_1.commonConstants.TOKEN.INVALID_TOKEN });
                    }
                    else {
                        const userid = decode.data.userId;
                        const data = yield userService_1.default.getUserDetail({ field1: 'user_id=$1' }, { userId: userid });
                        if (!data) {
                            return res
                                .status(responseConstants_1.default.ERROR401.CODE)
                                .json({ message: commonConstants_1.commonConstants.USER.USER_NOT_FOUND });
                        }
                        req.user = data.rows[0];
                        console.log("gggg", data.rows[0]);
                        next();
                    }
                }));
            }
            else {
                res.status(401).send({ message: commonConstants_1.commonConstants.TOKEN.TOKEN_REQUIRED });
            }
        };
        this.storage = multer.diskStorage({
            destination: "dist/uploads",
            filename: (req, file, cb) => { return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); },
        });
        this.upload = multer({
            storage: this.storage,
            limits: {
                fileSize: 1024 * 1024 * 1000,
            },
        });
        this.sendEmail = (email, subject, template) => __awaiter(this, void 0, void 0, function* () {
            try {
                let transporter = nodemailer.createTransport({
                    service: process.env.MAIL_SERVICE,
                    host: process.env.MAIL_HOST,
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS,
                    },
                });
                yield transporter.sendMail({
                    from: process.env.MAIL_FROM_USER,
                    to: email,
                    subject: subject,
                    html: template,
                });
                return true;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.default = new Utils();
//# sourceMappingURL=utils.js.map
import * as path from "path";
import * as multer from "multer";
import * as jwt from "jsonwebtoken";
import responseConstants from "../constants/responseConstants";
import userService from "../modules/userService";
import { commonConstants } from "../constants/commonConstants";
import * as nodemailer from "nodemailer";
class Utils {
    constructor() {
    }

    public generateToken = (data) => {
        return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: "24hr" });
    };
    public decodeAuthToken = (token) => {
        if (token) {
            try {
                return jwt.decode(token);
            } catch (error) {
                return false;
            }
        }
        return false;
    };

    public isAuth = () => (req, res, next) => {
        const token = req.header("authorization");
        console.log(token)
        if (token) {
            const JWTtoken = token.slice(7, token.length);
            jwt.verify(JWTtoken, process.env.JWT_SECRET, async (err, decode) => {
                if (err) {
                    res
                        .status(401)
                        .send({ message: commonConstants.TOKEN.INVALID_TOKEN });
                } else {
                    const userid = decode.data.userId;
                    const data = await userService.getUserDetail({ field1: 'user_id=$1' }, { userId: userid })
                    if (!data) {
                        return res
                            .status(responseConstants.ERROR401.CODE)
                            .json({ message: commonConstants.USER.USER_NOT_FOUND });
                    }
                    req.user = data.rows[0];
                    console.log("gggg", data.rows[0])
                    next();
                }
            });
        } else {
            res.status(401).send({ message: commonConstants.TOKEN.TOKEN_REQUIRED });
        }
    };
    public storage = multer.diskStorage({
        destination: "dist/uploads",
        filename: (req, file, cb) => { return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); },
    });
    public upload = multer({
        storage: this.storage,
        limits: {
            fileSize: 1024 * 1024 * 1000,
        },
    });

    public sendEmail = async (email, subject, template) => {
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
            await transporter.sendMail({
                from: process.env.MAIL_FROM_USER,
                to: email,
                subject: subject,
                html: template,
            });

            return true;
        } catch (error) {
            return error;
        }
    };
}

export default new Utils();
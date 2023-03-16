
import userService from "./userService";
import { Request, Response } from 'express';
import * as bcrypt from "bcryptjs";
import responseConstants from "../constants/responseConstants";
import utils from "../helper/utils";
import { commonConstants } from "../constants/commonConstants";
import { Query } from 'express-serve-static-core';
import emailVerify from "../templates/email-verify.html";
import emailVerifyResponse from "../templates/email-verify-response.html";
import Axios from "axios";
declare global {
    namespace Express {
        interface User {
            user_id: Number;
        }
    }
}

export default class UserController {
    constructor() { }
    public register = async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log(req.files)
            await userService.register(req.body, req.file, req.files)
            return res.status(responseConstants.STANDARD.SUCCESS).send({
                message: "User Register Successfully"
            });
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    }

    public userList = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = await userService.userList()
            return res.status(responseConstants.STANDARD.SUCCESS).send({
                message: "User List",
                data: data
            });
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    }

    public getUserDetail = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = await userService.getUserDetail({ field1: 'user_id=$1' }, { userId: req.params.id })
            return res.status(responseConstants.STANDARD.SUCCESS).send({
                message: "User List",
                data: data.rows
            });
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    }

    public updateUser = async (req: any, res: Response): Promise<Response> => {
        try {
            console.log(req.files.image)
            await userService.updateUser({ query: 'UPDATE USERS SET first_name=$1,last_name=$2,email=$3,image=$4,address=$5,phone_number=$6,address_image=$7 WHERE user_id=$8' },
                [req.body.first_name, req.body.last_name, req.body.email, req.files.image, req.body.address, req.body.phone_number, req.files.address_image, req.params.id])
            return res.status(responseConstants.STANDARD.SUCCESS).send({
                message: "User Updated Successfully"
            });
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    }

    public deleteUser = async (req: any, res: Response): Promise<Response> => {
        try {
            await userService.deleteUser(req.user.user_id)
            return res.status(responseConstants.STANDARD.SUCCESS).send({
                message: "User Deleted Successfully"
            });
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    }

    public login = async (req, res) => {
        const { email, password } = req.body;
        const user = await userService.getUserDetail({ field1: 'email=$1' }, { userId: email })
        if (user.rows[0]) {
            if (bcrypt.compareSync(password, user.rows[0].password)) {
                res.status(responseConstants.STANDARD.SUCCESS).send({
                    userId: user.rows[0].user_id,
                    firstName: user.rows[0].first_name,
                    lastName: user.rows[0].last_name,
                    email: user.rows[0].email,
                    token: utils.generateToken({
                        userId: user.rows[0].user_id,
                        email: user.rows[0].email,
                    }),
                });
                return;
            }
        }
        res.status(responseConstants.ERROR401.CODE).send({
            message: commonConstants.USER.INVALID_EMAIL
        });
    };

    public forgetpassword = async (req, res) => {
        const user = await userService.getUserDetail({ field1: 'email=$1' }, { userId: req.body.email })
        console.log(user.rows[0])
        if (!user.rows[0]) {
            return res
                .status(responseConstants.ERROR400.CODE)
                .send({ message: commonConstants.USER.INVALID_EMAIL });
        }
        const token = utils.generateToken({ email: user.rows[0].email, userId: user.rows[0].user_id });
        console.log(token)
        await userService.updateUser({ query: 'UPDATE USERS SET tokens=$1 WHERE email=$2' }, [token, req.body.email])
        const mail: any = utils.sendEmail(user.rows[0].email,
            commonConstants.USER.PASSWORD_RESET, emailVerify(token));
        if (mail) {
            return res
                .status(responseConstants.STANDARD.SUCCESS)
                .send({ message: commonConstants.USER.PASSWORD_RESET_LINK });
        } else {
            return res
                .status(responseConstants.ERROR500.CODE)
                .send({ message: commonConstants.USER.SERVER });
        }
    };

    public emailVerification = async (req, res) => {
        try {
            const token: any = utils.decodeAuthToken(req.params.token);
            let message = "";
            const user = await userService.getUserDetail({ field1: 'user_id=$1' }, { userId: token.data.user_id })
            if (user) {
                if (!user.token || user.token != req.params.token) {
                    message = commonConstants.TOKEN.INVALID_TOKEN;
                } else {
                    user.token = "";
                    message = commonConstants.USER.VERIFIED;
                }

                res.write(emailVerifyResponse(message));
                res.end();
            } else {
                res.write(emailVerifyResponse(commonConstants.USER.USER_NOT_FOUND));
                res.end();
            }
        } catch (error) {
            res.write(emailVerifyResponse(commonConstants.USER.USER_NOT_FOUND));
            res.end();
        }
    };

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

    public productList = async (req: any, res: Response): Promise<Response> => {
        try {

            const productList = await Axios.get(`${process.env.PRODUCT_URL}/api/v1/product/productList`)
            return res.status(responseConstants.STANDARD.SUCCESS).send({
                message: "Data Fetched Successfully",
                data: productList.data.data
            });
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    }

    public productDetail = async (req: any, res: Response): Promise<Response> => {
        try {
            const productList = await Axios.get(`${process.env.PRODUCT_URL}/api/v1/product/productDetail?id=${req.query.id}`)
            return res.status(responseConstants.STANDARD.SUCCESS).send({
                message: "Data Fetched Successfully",
                data: productList.data.data
            });
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    }

    public updateProductDetail = async (req: any, res: Response): Promise<Response> => {
        try {
            const productList = await Axios.put(`${process.env.PRODUCT_URL}/api/v1/product/updateProduct`, {
                productName: req.body.productName,
                productType: req.body.productType,
                productPrice: req.body.productPrice,
                productQty: req.body.productQty,
                productId: req.query.Id
            })
            return res.status(responseConstants.STANDARD.SUCCESS).send({
                message: "Product Updated Successfully",
                data: productList.data.data
            });
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    }
}

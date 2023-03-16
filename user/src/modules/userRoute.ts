import * as express from "express";
import Utils from "../helper/utils";
import UserController from "./userController";

class AdminRoute {
    public userRoute = express.Router();
    protected userController = new UserController()
    constructor() {
        this.userRoute.post(
            "/user",
            // Utils.upload.single("image"),
            Utils.upload.fields([{ name: 'addressImage' }, { name: 'image' }]),
            this.userController.register
        );
        this.userRoute.get(
            "/user",
            Utils.isAuth(),
            this.userController.userList
        );
        this.userRoute.get(
            "/user",
            Utils.isAuth(),
            this.userController.getUserDetail
        );
        this.userRoute.put(
            "/user",
            Utils.isAuth(),
            Utils.upload.fields([{ name: 'addressImage' }, { name: 'image' }]),
            this.userController.updateUser
        );
        this.userRoute.delete(
            "/user",
            Utils.isAuth(),
            this.userController.deleteUser
        );
        this.userRoute.post(
            "/login",
            this.userController.login
        );
        this.userRoute.post(
            "/forgotPassword",
            this.userController.forgetpassword
        );
        this.userRoute.get(
            "/verifyemail/:token",
            this.userController.emailVerification
        );
        this.userRoute.get(
            "/productList",
            this.userController.productList
        );
        this.userRoute.get(
            "/productDetail",
            this.userController.productDetail
        );
        this.userRoute.put(
            "/updateProduct",
            Utils.isAuth(),
            this.userController.updateProductDetail
        );
    }
}
export default new AdminRoute();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const utils_1 = require("../helper/utils");
const userController_1 = require("./userController");
class AdminRoute {
    constructor() {
        this.userRoute = express.Router();
        this.userController = new userController_1.default();
        this.userRoute.post("/user", 
        // Utils.upload.single("image"),
        utils_1.default.upload.fields([{ name: 'addressImage' }, { name: 'image' }]), this.userController.register);
        this.userRoute.get("/user", utils_1.default.isAuth(), this.userController.userList);
        this.userRoute.get("/user", utils_1.default.isAuth(), this.userController.getUserDetail);
        this.userRoute.put("/user", utils_1.default.isAuth(), utils_1.default.upload.fields([{ name: 'addressImage' }, { name: 'image' }]), this.userController.updateUser);
        this.userRoute.delete("/user", utils_1.default.isAuth(), this.userController.deleteUser);
        this.userRoute.post("/login", this.userController.login);
        this.userRoute.post("/forgotPassword", this.userController.forgetpassword);
        this.userRoute.get("/verifyemail/:token", this.userController.emailVerification);
        this.userRoute.get("/productList", this.userController.productList);
        this.userRoute.get("/productDetail", this.userController.productDetail);
        this.userRoute.put("/updateProduct", utils_1.default.isAuth(), this.userController.updateProductDetail);
    }
}
exports.default = new AdminRoute();
//# sourceMappingURL=userRoute.js.map
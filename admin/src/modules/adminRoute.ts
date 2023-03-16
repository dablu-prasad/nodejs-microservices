import * as express from "express";
import AdminController from "./adminController";
class AdminRoute {
    public adminRoute = express.Router();
    protected adminController = new AdminController();
    constructor() {
        /**Admin Routes Start */
        this.adminRoute.get(
            "/admin",
            this.adminController.admin
        );
        this.adminRoute.post(
            "/userRegister",
            this.adminController.userRegister
        );
    }
}
export default new AdminRoute();

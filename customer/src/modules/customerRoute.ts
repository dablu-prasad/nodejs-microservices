import * as express from "express";
import CustomerController from "./customerController";

class AdminRoute {
    public customerRoute = express.Router();
          protected customerController=       new CustomerController()
    constructor() {
        /**Admin Routes Start */
        this.customerRoute.post(
            "/customer",
            this.customerController.customer
        );
    }
}
export default new AdminRoute();

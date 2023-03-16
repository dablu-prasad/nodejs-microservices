"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const adminController_1 = require("./adminController");
class AdminRoute {
    constructor() {
        this.adminRoute = express.Router();
        this.adminController = new adminController_1.default();
        /**Admin Routes Start */
        this.adminRoute.get("/admin", this.adminController.admin);
        this.adminRoute.post("/userRegister", this.adminController.userRegister);
    }
}
exports.default = new AdminRoute();
//# sourceMappingURL=adminRoute.js.map
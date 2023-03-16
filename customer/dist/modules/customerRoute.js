"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const customerController_1 = require("./customerController");
class AdminRoute {
    constructor() {
        this.customerRoute = express.Router();
        this.customerController = new customerController_1.default();
        /**Admin Routes Start */
        this.customerRoute.post("/customer", this.customerController.customer);
    }
}
exports.default = new AdminRoute();
//# sourceMappingURL=customerRoute.js.map
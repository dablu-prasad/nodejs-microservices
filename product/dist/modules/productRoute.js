"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const productController_1 = require("./productController");
class AdminRoute {
    constructor() {
        this.productRoute = express.Router();
        this.productController = new productController_1.default();
        this.productRoute.post("/product", this.productController.createProduct);
        this.productRoute.get("/productList", this.productController.productList);
        this.productRoute.get("/productDetail", this.productController.getProductDetail);
        this.productRoute.put("/updateProduct", this.productController.updateProduct);
    }
}
exports.default = new AdminRoute();
//# sourceMappingURL=productRoute.js.map
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
const modelConstants_1 = require("../constants/modelConstants");
const productService_1 = require("./productService");
class ProductController {
    constructor() {
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield productService_1.default.addProduct(req.body);
                return res.status(modelConstants_1.default.STANDARD.SUCCESS).send({
                    message: "User Register Successfully"
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
        this.productList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield productService_1.default.productList();
                return res.status(modelConstants_1.default.STANDARD.SUCCESS).send({
                    message: "Product list fetched successfully",
                    data: data.rows
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
        this.getProductDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield productService_1.default.getProductDetail({ field1: `product_id=$1` }, { userId: req.query.id });
                return res.status(modelConstants_1.default.STANDARD.SUCCESS).send({
                    message: "Product List",
                    data: data.rows
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield productService_1.default.updateProduct({
                    productName: req.body.productName,
                    productType: req.body.productType,
                    productPrice: req.body.productPrice,
                    productQty: req.body.productQty,
                    productId: req.body.productId
                });
                return res.status(modelConstants_1.default.STANDARD.SUCCESS).send({
                    message: "Update Product List"
                });
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=productController.js.map
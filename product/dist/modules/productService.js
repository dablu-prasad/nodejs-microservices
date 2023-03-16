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
const database_1 = require("../database");
class ProductService {
    constructor() {
        this.addProduct = (data) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.dbConnection.query('INSERT INTO PRODUCTS (product_name,product_type,product_price,product_qty) VALUES ($1,$2,$3,$4)', [data.product_name, data.product_type, data.product_price, data.product_qty]);
        });
        this.productList = () => __awaiter(this, void 0, void 0, function* () {
            return database_1.dbConnection.query('SELECT * FROM PRODUCTS');
        });
        this.getProductDetail = (field, userId) => __awaiter(this, void 0, void 0, function* () {
            return database_1.dbConnection.query(`SELECT * FROM PRODUCTS WHERE ${field.field1}`, [userId.userId]);
        });
        this.updateProduct = (data) => __awaiter(this, void 0, void 0, function* () {
            return database_1.dbConnection.query(`UPDATE PRODUCTS SET product_name=$1,product_type=$2,product_price=$3,product_qty=$4 WHERE PRODUCT_ID=$5`, [data.productName, data.productType, data.productPrice, data.productQty, data.productId]);
        });
    }
}
exports.default = new ProductService;
//# sourceMappingURL=productService.js.map
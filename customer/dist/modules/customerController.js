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
const customerService_1 = require("./customerService");
class CustomerController {
    constructor() {
        this.customer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("customer Port... 4002");
            const data = yield customerService_1.default.customerData();
            res.status(modelConstants_1.default.ERROR401.CODE).send({
                message: "customer Port... 4002",
                data: data
            });
        });
    }
}
exports.default = CustomerController;
//# sourceMappingURL=customerController.js.map
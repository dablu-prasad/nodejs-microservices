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
const axios_1 = require("axios");
class AdminController {
    constructor() {
        this.admin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            axios_1.default.get(`${process.env.SERVER}/api/v1/user/user`).then(response => {
                return res.json(response.data.data);
            })
                .catch(err => {
                console.log(err);
                res.send(500);
            });
        });
        this.userRegister = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.post(`${process.env.SERVER}/api/v1/user/register`, req.body)
                .catch(err => {
                console.log(err);
                res.send(500);
            });
            return res.status(modelConstants_1.default.STANDARD.SUCCESS).send({
                message: "User Register Successfully"
            });
        });
    }
}
exports.default = AdminController;
//# sourceMappingURL=adminController.js.map
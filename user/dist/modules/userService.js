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
const bcrypt = require("bcryptjs");
const database_1 = require("../database");
class UserService {
    constructor() {
        this.register = (data, image, multiImg) => __awaiter(this, void 0, void 0, function* () {
            var salt = bcrypt.genSaltSync(10);
            var hashPassword = bcrypt.hashSync(data.password, salt);
            yield database_1.dbConnection.query('INSERT INTO USERS (first_name,last_name,email,salt,password,image,address,phone_number,address_image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [data.first_name, data.last_name, data.email, salt, hashPassword, multiImg.image, data.address, data.phone_number, multiImg.addressImage]);
        });
        this.userList = () => __awaiter(this, void 0, void 0, function* () {
            return database_1.dbConnection.query('SELECT * FROM USERS');
        });
        this.getUserDetail = (field, userId) => __awaiter(this, void 0, void 0, function* () {
            return database_1.dbConnection.query(`SELECT * FROM USERS WHERE ${field.field1}`, [userId.userId]);
        });
        this.updateUser = (data, value) => __awaiter(this, void 0, void 0, function* () {
            return database_1.dbConnection.query(data.query, value);
        });
        this.deleteUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            return database_1.dbConnection.query('DELETE FROM USERS WHERE USER_ID=$1', [userId]);
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map
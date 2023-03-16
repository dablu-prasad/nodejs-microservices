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
const amqp = require("amqplib");
var channel, connection;
class AdminService {
    constructor() {
        this.createChannel = () => __awaiter(this, void 0, void 0, function* () {
            const connection = yield amqp.connect("amqp://localhost:5672");
            channel = yield connection.createChannel();
            channel.assertQueue("RABBHIT");
        });
        this.adminData = () => {
            return channel.consume("RABBHIT", data => {
                console.log(`Received ${Buffer.from(data.content)}`);
                channel.ack(data);
                return Buffer.from(data.content);
            });
        };
        if (!channel) {
            this.createChannel();
        }
    }
}
exports.default = new AdminService();
//# sourceMappingURL=adminService.js.map
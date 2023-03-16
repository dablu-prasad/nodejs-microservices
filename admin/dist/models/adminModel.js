"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    adminName: {
        default: "",
        type: String,
    },
    email: {
        default: "",
        type: String,
    },
    password: {
        default: "",
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false,
    collation: { locale: "en", strength: 1 },
});
const adminModel = (0, mongoose_1.model)("admin", adminSchema);
exports.default = adminModel;
//# sourceMappingURL=adminModel.js.map
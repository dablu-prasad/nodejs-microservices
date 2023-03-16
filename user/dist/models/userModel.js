"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
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
const userModel = (0, mongoose_1.model)("user", userSchema);
exports.default = userModel;
//# sourceMappingURL=userModel.js.map
import { Schema, model as Model } from "mongoose";

const userSchema = new Schema(
    {
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
    },
    {
        timestamps: true,
        versionKey: false,
        collation: { locale: "en", strength: 1 },
    }
);
const userModel = Model("user", userSchema);
export default userModel;
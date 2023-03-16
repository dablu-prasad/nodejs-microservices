import { Schema, model as Model } from "mongoose";

const adminSchema = new Schema(
    {
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
    },
    {
        timestamps: true,
        versionKey: false,
        collation: { locale: "en", strength: 1 },
    }
);
const adminModel = Model("admin", adminSchema);
export default adminModel;
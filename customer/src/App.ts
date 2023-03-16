import * as cors from "cors";
import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import CustomerRoute from "./modules/customerRoute";
class App {
    public express;
    constructor() {
        let authMongo = '';
        this.express = express();
        if (process.env.DB_USER !== '' && process.env.DB_PASS !== '') {
            authMongo = `${process.env.DB_USER}:${process.env.DB_PASS}@`;
        }
        mongoose.connect("mongodb+srv://dablu:dablu123@cluster0.i6tby.mongodb.net/admins?retryWrites=true&w=majority").then((res) => {
            console.log("Mongo Connected Successfully");
        });
        mongoose.connection.on("error", (err) => {
            console.log(err);
        });
        mongoose.set("debug", true);
        this.express.use(bodyParser.json({ limit: "1gb" }));
        this.express.use(bodyParser.urlencoded({ limit: "1gb", extended: true }));
        this.express.use(cors());
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', '*');
            res.header('Access-Control-Allow-Methods', '*');
            next();
        });
        this.express.set("port", process.env.PORT);
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.use("/uploads", express.static(`${__dirname}/uploads`));
        router.use("/images", express.static(`${__dirname}/images`));
        router.use("/api/v1/customer", CustomerRoute.customerRoute);
        this.express.use(router);
    }
}

export default new App().express;

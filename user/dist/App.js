"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const userRoute_1 = require("./modules/userRoute");
const database_1 = require("./database");
class App {
    constructor() {
        database_1.dbConnection.connect().then((res) => {
            console.log("Postgres connected successfully !!");
        }).catch((err) => {
            console.log("Pg connection Error", err);
        });
        this.express = express();
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
    mountRoutes() {
        const router = express.Router();
        router.use("/uploads", express.static(`${__dirname}/uploads`));
        router.use("/images", express.static(`${__dirname}/images`));
        router.use("/api/v1/user", userRoute_1.default.userRoute);
        this.express.use(router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map
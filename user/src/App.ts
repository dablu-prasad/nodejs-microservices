import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import UserRoute from "./modules/userRoute";
import { dbConnection } from "./database";

class App {
    public express;
    constructor() {
        dbConnection.connect().then((res) => {
            console.log("Postgres connected successfully !!")
        }).catch((err) => {
            console.log("Pg connection Error",err);
        })
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

    private mountRoutes(): void {
        const router = express.Router();
        router.use("/uploads", express.static(`${__dirname}/uploads`));
        router.use("/images", express.static(`${__dirname}/images`));
        router.use("/api/v1/user", UserRoute.userRoute);
        this.express.use(router);
    }
}

export default new App().express;

import * as cors from "cors";
import * as express from "express";
import * as proxy from "express-http-proxy"
class App {
    public express;
    constructor() {
        this.express = express();
        this.express.use(cors());
        this.express.set("port", process.env.PORT);
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.use("/admin", proxy("http://localhost:4001"));
        router.use("/customer", proxy("http://localhost:4002"));
        router.use("/product", proxy("http://localhost:4003"));
        router.use("/", proxy("http://localhost:4004"));
        this.express.use(router);
    }
}

export default new App().express;

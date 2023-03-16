"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const proxy = require("express-http-proxy");
class App {
    constructor() {
        this.express = express();
        this.express.use(cors());
        this.express.set("port", process.env.PORT);
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.use("/admin", proxy("http://localhost:4001"));
        router.use("/customer", proxy("http://localhost:4002"));
        router.use("/product", proxy("http://localhost:4003"));
        router.use("/", proxy("http://localhost:4004"));
        this.express.use(router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map
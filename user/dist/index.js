"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const App_1 = require("./App");
http.createServer(App_1.default).listen(App_1.default.get("port"), () => {
    console.log("Express server listening on port " + App_1.default.get("port"));
});
//# sourceMappingURL=index.js.map
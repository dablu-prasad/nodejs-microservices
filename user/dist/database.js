"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const pg_1 = require("pg");
exports.dbConnection = new pg_1.Pool({
    user: "tuser",
    host: "db",
    password: "linexc",
    database: "user",
    // port: 5432
});
//# sourceMappingURL=database.js.map
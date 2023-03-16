"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const pg_1 = require("pg");
exports.dbConnection = new pg_1.Pool({
    url: "postgres://tuser:linexc@postgres:5432/product",
    database: "product",
    user: "tuser",
    password: "linexc",
});
// export const dbConnection = new Pool({
//     user: "tuser",
//     host: "postgres",
//     password: "linexc",
//     database: "product",
//     port: 5432
// })
//# sourceMappingURL=database.js.map
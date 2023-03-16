import { Pool } from 'pg'


export const dbConnection = new Pool({
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
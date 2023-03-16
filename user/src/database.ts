import { Pool } from 'pg'

export const dbConnection = new Pool({
    user: "tuser",
    host: "db",
    password: "linexc",
    database: "user",
    // port: 5432
}
)
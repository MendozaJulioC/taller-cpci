import { Pool } from 'pg';

export const dblocal = new Pool({
    user: process.env.K_PGUSER,
    host: process.env.K_PGHOST,
    database: process.env.K_PGDATABASE,
    password: process.env.K_PGPASSWORD,
    port: Number(process.env.K_PGPORT) || 5432,
    ssl: {
        rejectUnauthorized: false,
        // ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
        // key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
        // cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
    },
    keepAlive: true,
    max: Number(process.env.K_PGPOOL_MAX) || 10,
    idleTimeoutMillis: Number(process.env.K_PG_IDLE_TIMEOUT) || 30000,
    connectionTimeoutMillis: Number(process.env.K_PG_CONN_TIMEOUT) || 10000,
})



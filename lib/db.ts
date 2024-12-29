/* eslint-disable @typescript-eslint/no-explicit-any */

import { neon, Client } from "@neondatabase/serverless";

// Declare a single client instance
let client: Client | null = null;

async function getClient() {
  if (!client) {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
    await client.connect();
  }
  return client;
}

export async function query(text: string, params?: any[]) {
  const dbClient = await getClient();
  return dbClient.query(text, params);
}

export default query;


// import { Pool } from "pg";

// const pool = new Pool({
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   port: parseInt(process.env.PGPORT || "5432", 10),
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// export default pool;

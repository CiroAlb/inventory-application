import { Pool } from "pg";
import "dotenv/config";

console.log("PASSWORD:", process.env.POSTGRES_PASSWORD);
console.log("TYPE:", typeof process.env.POSTGRES_PASSWORD);

const db = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

export default db;

import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config();

const pool = new Pool({
  user:     process.env.db_user,
  host:     process.env.db_host,
  database: process.env.db_database,
  password: process.env.db_password,
  port:     parseInt(process.env.db_port || '5432'),
});

export default pool;
import pool from "../config/db";

async function runMigration () : Promise<void> {
  await pool.end();
};

runMigration().catch(console.error);
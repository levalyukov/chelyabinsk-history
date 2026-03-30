import { Request, Response } from 'express';

import pool from "../config/db";
import { type Reports } from "../interfaces/reports.interface";

export async function getReports (req:Request, res:Response): Promise<void> {
  try {
    const result = await pool.query<Reports>('SELECT * FROM reports');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err });
  };
};
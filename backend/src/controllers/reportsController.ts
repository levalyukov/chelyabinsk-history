import pool from "../config/db";
import { Request, Response } from 'express';
import { type Reports } from "../interfaces/reports.interface";

export async function getReports (req:Request, res:Response) : Promise<void> {
  try {
    const result = await pool.query<Reports>('SELECT * FROM Report');
    res.status(200).send(result.rows);
  } catch (err) {
    res.status(200).send({});
  };
};

export async function addReport (req:Request, res:Response) : Promise<void> {
  try {
    const {title, content, image, video} = req.body;

    if (!title || !content || !image) res.status(400);

    const result = await pool.query('INSERT INTO Report () VALUES (?)', []);
    res.status(200).send({report: {title, content}});
  } catch (err) {
    res.status(404).send({});
  };
};

export async function getReport (req:Request, res:Response) : Promise<void> {
  try {

  } catch (err) {
    res.status(404).send({});
  };
};

export async function changeReport (req:Request, res:Response) : Promise<void> {
  try {

  } catch (err) {
    res.status(404).send({});
  };
};

export async function deleteReport (req:Request, res:Response) : Promise<void> {
  try {

  } catch (err) {
    res.status(404).send({});
  };
};
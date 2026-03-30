import express from "express";
import "../controllers/reportsController"
import * as reportsController from "../controllers/reportsController";

const router = express.Router();

router.get("/reports", reportsController.getReports);

export default router;
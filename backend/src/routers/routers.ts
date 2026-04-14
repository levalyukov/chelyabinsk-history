import express from "express";
import "../controllers/reportsController"
import * as reportsController from "../controllers/reportsController";

const router = express.Router();

router.get("/all_reports", reportsController.getReports);
router.post("/add_report", reportsController.addReport);
router.get("/get_report", reportsController.getReport);
router.post("/change_report", reportsController.changeReport);
router.get("/delete_report", reportsController.deleteReport);

export default router;
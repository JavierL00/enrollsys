import { Router } from "express";
import {
  getEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../controllers/enrollment.controllers.js";

const router = Router();

router.get("/enrollments", getEnrollments);
router.get("/enrollments/:id", getEnrollment);
router.post("/enrollments", createEnrollment);
router.put("/enrollments/:id", updateEnrollment);
router.delete("/enrollments/:id", deleteEnrollment);

export default router;

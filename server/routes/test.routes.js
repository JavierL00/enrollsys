import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/test", async (req, res) => {
  try {
    res.json({ message: "On Work !" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/ping", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 as result");
    console.log(rows[0]);
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
});

export default router;

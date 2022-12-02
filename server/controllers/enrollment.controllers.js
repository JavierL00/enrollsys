import { pool } from "../db.js";

export const getEnrollments = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM enrollment");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEnrollment = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("SELECT * FROM enrollment WHERE id = ?", [
      id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Enrollment Not Found." });
    } else {
      res.json(result);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEnrollment = async (req, res) => {
  try {
    const { student_id, user_id, is_paid, adds } = req.body;
    const [result] = await pool.query(
      "INSERT INTO enrollment(student_id, user_id, is_paid, adds) VALUES (?, ?, ?, ?)",
      [student_id, user_id, is_paid, adds]
    );

    if (result.affectedRows === 0) {
      console.log(result);
      return res.status(404).json({ message: "Enrollment Not Created" });
    }
    if (result.affectedRows === 1) {
      console.log(result);
      return res.json({
        id: result.insertId,
        student_id,
        user_id,
        is_paid,
        adds,
      });
    } else {
      console.log(result);
      return res.json({ message: "Failed Process" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM enrollment WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Enrollment Not Found" });
    }
    if (result.affectedRows === 1) {
      return res.json({ message: "Enrollment Deleted" });
    } else {  
      return res.json({ message: "Failed Process" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEnrollment = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE enrollment SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Enrollment Not Found" });
    }
    if (result.affectedRows === 1) {
      return res.json({ message: "Enrollment Updated" });
    } else {
      return res.json({ message: "Failed Process" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

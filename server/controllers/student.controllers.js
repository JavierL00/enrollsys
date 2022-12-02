import { pool } from "../db.js";

export const getStudents = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM student");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("SELECT * FROM student WHERE id = ?", [
      id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Student Not Found." });
    } else {
      res.json(result);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { dni, name, surname, age, address } = req.body;
    const [result] = await pool.query(
      "INSERT INTO student(dni, name, surname, age, address) VALUES (?, ?, ?, ?, ?)",
      [dni, name, surname, age, address]
    );

    if (result.affectedRows === 0) {
      console.log(result);
      return res.status(404).json({ message: "Student Not Created" });
    }
    if (result.affectedRows === 1) {
      console.log(result);
      return res.json({
        id: result.insertId,
        dni,
        name,
        surname,
        age,
        address,
      });
    } else {
      console.log(result);
      return res.json({ message: "Failed Process" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM student WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student Not Found" });
    }
    if (result.affectedRows === 1) {
      return res.json({ message: "Student Deleted" });
    } else {
      return res.json({ message: "Failed Process" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE student SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student Not Found" });
    }
    if (result.affectedRows === 1) {
      return res.json({ message: "Student Updated" });
    } else {
      return res.json({ message: "Failed Process" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

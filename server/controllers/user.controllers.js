import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM user");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "User Not Found." });
    } else {
      res.json(result);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { dni, name, surname, email, password, role_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO user(dni, name, surname, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?)",
      [dni, name, surname, email, password, role_id]
    );
    res.json({
      id: result.insertId,
      dni,
      name,
      surname,
      email,
      password,
      role_id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM user WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (result.affectedRows === 1) {
      return res.json({ message: "User Deleted" });
    } else {
      return res.json({ message: "Failed Process" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE user SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (result.affectedRows === 1) {
      return res.json({ message: "User Updated" });
    } else {
      return res.json({ message: "Failed Process" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

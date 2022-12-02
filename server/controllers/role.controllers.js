import { pool } from "../db.js";

export const getRoles = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM role");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRole = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM role WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0)
      return res.status(404).json({ message: "Role Not Found." });
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const [result] = await pool.query("INSERT INTO role(name) VALUES (?)", [
      name,
    ]);
    res.json({
      id: result.insertId,
      name,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE role SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM role WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Role Not Found" });
    
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

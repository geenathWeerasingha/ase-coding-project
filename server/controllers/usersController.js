const db = require("../config/database");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      `SELECT id,username, firstname, lastname  FROM users`
    );

    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createNewUser = async (req, res) => {
  if (
    !req?.body?.userName ||
    !req?.body?.firstName ||
    !req?.body?.lastName ||
    !req?.body?.password
  ) {
    return res.status(400).json({ message: "user details are required" });
  }

  try {
    const user = req?.body?.userName;

    const [rows] = await db.query(
      "SELECT username FROM users WHERE username = ?",
      [user]
    );
    if (rows.length > 0) return res.sendStatus(409); // Conflict

    const pwd = req?.body?.password;
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const [result] = await db.query(
      "INSERT INTO users (username,password,firstname,lastname) VALUES (?, ?,?, ?)",
      [req.body.userName, hashedPwd, req.body.firstName, req.body.lastName]
    );
    res.status(201).json({ id: result.insertId, username: req.body.userName });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateUser = async (req, res) => {
  if (
    !req?.body?.userName ||
    !req?.body?.firstName ||
    !req?.body?.lastName ||
    !req?.body?.id
  ) {
    return res.status(400).json({ message: "user details are required" });
  }

  try {
    const [result] = await db.query(
      "UPDATE users SET userName = ?, firstName = ?, lastName=? WHERE id = ?",
      [req.body.userName, req.body.firstName, req.body.lastName, req.body.id]
    );
    if (result.affectedRows === 0) {
      return res
        .status(204)
        .json({ message: `No employee matches ID ${req.body.id}.` });
    }
    res.json({ id: req.body.id, username: req.body.userName });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "user ID required." });

  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(204)
        .json({ message: `No employee matches ID ${req.body.id}.` });
    }
    res.json({ message: `user ID ${req.body.id} deleted` });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};

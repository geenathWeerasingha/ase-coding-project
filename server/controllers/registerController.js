const db = require("../config/database"); // Update the path as necessary
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;

  const user = username;
  const pwd = password;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    // Check for duplicate usernames in the db
    const [rows] = await db.query(
      "SELECT username FROM users WHERE username = ?",
      [user]
    );
    if (rows.length > 0) return res.sendStatus(409); // Conflict

    // Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Create and store the new user
    const result = await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [user, hashedPwd]
    );

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };

const db = require("../config/database"); // Update the path as necessary

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  try {
    // Is refreshToken in db?
    const [rows] = await db.query(
      "SELECT * FROM users WHERE refreshToken = ?",
      [refreshToken]
    );
    const foundUser = rows[0];

    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    await db.query("UPDATE users SET refreshToken = ? WHERE id = ?", [
      "",
      foundUser.id,
    ]);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports = { handleLogout };

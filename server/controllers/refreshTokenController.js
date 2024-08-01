const db = require("../config/database"); // Update the path as necessary
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  const refreshToken = cookies.jwt;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE refreshToken = ?",
      [refreshToken]
    );
    const foundUser = rows[0];

    if (!foundUser) return res.sendStatus(403); // Forbidden

    // Evaluate jwtthh
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username)
          return res.sendStatus(403);

        // Assuming 'roles' column contains roles in a serialized form (e.g., JSON)
        // Assuming foundUser.roles is a JSON string representing an object
        const rolesObject = JSON.parse(foundUser.roles);

        // Extracting the values from the roles object
        const roles = Object.values(rolesObject);

        const accessToken = jwt.sign(
          {
            username: decoded.username,
            role: roles,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "10s" }
        );
        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports = { handleRefreshToken };

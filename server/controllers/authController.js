const db = require("../config/database"); // Update the path as necessary
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = username;
  const pwd = password;

  console.log(user, pwd);

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
      user,
    ]);
    const foundUser = rows[0];

    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      // Assuming 'roles' column contains roles in a serialized form (e.g., JSON)
      //  const roles = JSON.parse(foundUser.roles);
      // Assuming foundUser.roles is a JSON string representing an object
      const parsedRoles = JSON.parse(foundUser.roles);

      // Extracting the truthy values from the parsed object
      const roles = Object.values(parsedRoles).filter(Boolean);

      // create JWTs
      const accessToken = jwt.sign(
        {
          username: foundUser.username,
          role: roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // Update refreshToken in database
      await db.query("UPDATE users SET refreshToken = ? WHERE id = ?", [
        refreshToken,
        foundUser.id,
      ]);

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Send authorization roles and access token to user
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports = { handleLogin };

const db = require("../database/mongo.database");
const jwt = require("jsonwebtoken");
const {
  generateToken,
  isTokenExpired,
} = require("../middleware/auth.middleware");

const collection = db.collection("users");

const register = async (req, res) => {
  const data = req.body;

  const token = generateToken(data.email);

  const query = {
    username: data.username,
    email: data.email,
    password: data.password,
    token: token,
  };

  await collection.insertOne(query);

  res.status(200).json({
    success: true,
    message: "new user added",
    data: query,
  });
};

const login = async (req, res) => {
  const data = req.body;

  const token = generateToken(data.email);

  const query = {
    email: data.email,
    password: data.password,
  };

  const user = await collection.findOne(query);

  if (isTokenExpired(user.token)) {
    await collection.updateOne(
      { email: data.email },
      { $set: { token: token } }
    );

    console.log("new token generated");
  }

  res.status(201).json({
    success: true,
    message: "login approved",
    data: user,
  });
};

module.exports = { register, login };

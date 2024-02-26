const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const joi = require("joi");
const connectDB = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const PORT = process.env.PORT || 3000;
const schema = joi.object({
  Hero: joi.string().min(3).max(12).required(),
  Title: joi.string().min(3).max(18).required(),
  Ratings: joi.number().required(),
  Director: joi.string().min(3).required(),
  Image: joi.string().required(),
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const accessToken = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET);
  res.cookie("access_token", accessToken, { httpOnly: true });
  res.json({ message: "Login successful" });
});

app.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "Logout successful" });
});

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected Route. Data here." });
});

function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post("/movies/create", (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(201).send("Movie created successfully");
  }
});

app.get("/ping", (req, res) => res.send("pong"));

app.get("/", (req, res) => res.send("Hello! This is the Home Page"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
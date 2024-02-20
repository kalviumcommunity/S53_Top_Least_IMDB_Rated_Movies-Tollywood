const express = require("express");
require("dotenv").config();
const joi = require("joi");
const app = express();
app.use(express.json());
const connectDB = require("./db");
connectDB();
const PORT = process.env.PORT;
const router = require("./routes");
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use("/movies", router);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.post("/login",(req,res)=>{
  const {username , password} = req.body;
  const accessToken = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET);
  res.cookie("username", username, { httpOnly: true });
  res.json({ accessToken: accessToken }); 
});

app.post("/logout",(req,res)=>{
  res.clearCookie("username");
  res.send("Logout successful");
});


// app.get("/movies", authenticateToken, (req,res)=>{
//   res.json({ message: "Protected Route. Movies data here." });
// });

// function authenticateToken(req,res,next){
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(" ")[1];
//   if(token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
//     if(err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

app.get("/ping", (req, res) => res.send("pong"));
app.get("/", (req, res) => res.send("Hello! This is the Home Page"));

const schema = joi.object({
  Hero: joi.string().min(3).max(12).required(),
  Title: joi.string().min(3).max(18).required(),
  Ratings: joi.number().required(),
  Director: joi.string().min(3).required(),
  Image: joi.string().required()
});

app.post("/movies/create",(req,res)=>{
  const {error , value} = schema.validate(req.body);
  if(error){
    console.log("Invalid Input", error.message); 
    res.status(400).json({ error: error.message }); 
  } else {
    console.log("Success");
    res.status(201).send("Movie created successfully"); 
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



// const userSchema = joi.object({
//   Username
// })

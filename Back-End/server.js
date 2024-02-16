const express = require("express");
require("dotenv").config();
const joi = require("joi")
const app = express();
app.use(express.json())
const connectDB = require("./db");
connectDB();
const PORT = process.env.PORT;
const router = require("./routes");
const cors = require("cors");
app.use(cors());
app.use("/movies", router);


const cookieParser = require("cookie-parser")
app.use(cookieParser())

app.post("/login",(req,res)=>{
  const {username , password} = req.body

  res.cookie("username",username,{httpOnly : true})
  res.send("Login Successful")
})

app.post("/logout",(req,res)=>{
  res.clearCookie("username")
  res.send("Logout successful")
})



app.get("/ping", (req, res) => res.send("pong"));
app.get("/", (req, res) => res.send("Hello!!This is Home Page"));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

const schema = joi.object({
  Hero : joi.string().min(3).max(12).required(),
  Title : joi.string().required().min(3).max(18),
  Ratings : joi.number().required(),
  Director : joi.string().min(3).required(),
  Image : joi.string().required()

})

app.post("/movies/create",(req,res)=>{

  const {error , value} = schema.validate(req.body)
  if(error){
    console.log("Invalid Input");
  }else{
    console.log("Success");
  }

})
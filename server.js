const express = require("express");
require("dotenv").config();
const app = express();
const PORT= process.env.PORT 
app.listen(PORT , ()=>{
  console.log(`http://localhost:${PORT}`);
});

app.get("/ping", (req, res) => res.send("pong"));
app.get("/", (req, res) => res.send("Hello!!This is Home Page"));


const express = require("express")
const app = express()

app.get("/ping",(req,res)=>res.send("Hello!!! Welcome to Backend Development"))
app.listen(3500,()=>{
  console.log("hi");
})

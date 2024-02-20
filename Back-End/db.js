const mongoose = require("mongoose")
const env = require("dotenv")
const connectDB = async () =>{
  try {
    await mongoose.connect("mongodb+srv://jahnavesh:jahnavesh@cluster0.4atmmjr.mongodb.net/Asap-project")
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB
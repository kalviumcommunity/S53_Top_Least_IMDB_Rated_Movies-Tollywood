const mongoose = require("mongoose")
const env = require("dotenv")
const connectDB = async () =>{
  try {
    await mongoose.connect(process.env.mongoURI)
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB
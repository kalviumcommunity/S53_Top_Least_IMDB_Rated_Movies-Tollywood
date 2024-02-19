const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  Hero: {
    type: String,
    require: true,
  },
  Title: {
    type: String,
    require: true,
  },
  Ratings: {
    type: Number,
    require: true,
  },
  Director: {
    type: String,
    require: true,
  },
  Image : {
    type : String,
    require : true
  }
});


const Userschema = new mongoose.Schema({
  Username: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  ConfirmPassword : {
    type: String,
    require: true,
  }
});

const userschema = mongoose.model("users",Userschema)


const dataModel = mongoose.model("Movies_list", schema);
module.exports ={ dataModel , userschema};
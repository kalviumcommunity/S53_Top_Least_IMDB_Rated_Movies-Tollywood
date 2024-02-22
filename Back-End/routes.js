const express = require("express");
const app = express();
const router = express.Router();
app.use("/movies",router)
const joi = require("joi")
const {dataModel,userschema} = require("./Schema");


router.get("/movies", async (req, res) => {
  try {
    const newMovie = await dataModel.find();
    console.log("newMovie: ", newMovie);
    res.send(newMovie);
  } catch (err) {
    console.log("error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await dataModel.findById(req.params.id);
    res.json(movie);
  } catch (err) {
    res.send("err" + err);
  }
});

router.post("/create", async (req, res) => {
  const data = req.body;
  const movie = new dataModel(data);
  await movie.save();
  console.log(data);
  try {
    res.send({ message: true, movie: movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


const userValidation = joi.object({
  Username: joi.string().required(),
  Email: joi.string().required(),
  Password: joi.string().required(),
  ConfirmPassword: joi.string().required(),
});

router.post('/signupForm', async (req, res) => {
  try {
    const { error } = userValidation.validate(req.body); 
    if (error) {
      return res.json({ success: false, Message: error.details[0].message });
    }
    const { Email } = req.body; 
    const user = await userschema.findOne({ Email: Email });
    if (user && user.Email === Email) {
      res.json({ success: true, Message: "This user already exist please login with the another user name" })}
    else{
      const newData = new userSignup(req.body);
      const savedData = await newData.save();
      res.json({ success: true, data: newData });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});


router.post('/loginForm', async (req, res) => {
  try {
    const { Email , Password } = req.body; 
    const user = await userschema.findOne({ Email: Email , Password : Password });
    if (user && user.Email === Email && user.Password === Password) {
      res.json({ success: true, Message: "Login success" })}
    else{
      res.json({ success: false, message: "Please correct the user credentials" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});



router.put("/:id", async (req, res) => {
  // res.json({data :req.params.id});
  try {
    const { id } = req.params;
    const data = req.body;
    const movie1 = await dataModel.findByIdAndUpdate(id, data, { new: true });

    if (!movie1) {
      return res.status(404).json({ error: "Movie not Found" });
    }

    res.json(movie1);


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const movie = await dataModel.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
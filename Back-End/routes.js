const express = require("express");
const app = express();
const router = express.Router();
app.use("/movies", router);
const joi = require("joi");
const { dataModel, userschema } = require("./Schema");

const userValidation = joi.object({
  Username: joi.string().required(),
  Email: joi.string().required(),
  Password: joi.string().required(),
  ConfirmPassword: joi.string().required(),
});

router.get("/movies", async (req, res) => {
  try {
    const newMovie = await dataModel.find();
    console.log("newMovie: ", newMovie);
    res.json(newMovie);
  } catch (err) {
    res.json(err);
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

router.post("/signupForm", async (req, res) => {
  try {
    const { error } = userValidation.validate(req.body);
    if (error) {
      return res.json({ success: false, Message: error.details[0].message });
    }
    const { Email } = req.body;
    const user = await userschema.findOne({ Email: Email });
    if (user && user.Email === Email) {
      res.json({
        success: true,
        Message:
          "This user already exist please login with the another user name",
      });
    } else {
      const newData = new userschema(req.body);
      const savedData = await newData.save();
      res.json({ success: true, data: newData });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

router.post("/loginForm", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await userschema.findOne({ Email: Email, Password: Password });
    if (user && user.Email === Email && user.Password === Password) {
      res.json({ success: true, Message: "Login success" });
    } else {
      res.json({
        success: false,
        message: "Please correct the user credentials",
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await dataModel.findById(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    movie.Ratings = req.body.Ratings
    await movie.save()
    res.json({ message: "Movie updated successfully", movie });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Internal server error" });
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

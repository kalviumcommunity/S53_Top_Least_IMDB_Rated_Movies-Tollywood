const express = require("express");
const app = express();
const router = express.Router();
const dataModel = require("./Schema");
app.use(express.json());

router.get("/", async (req, res) => {
  try {
    const newMovie = await dataModel.find();
    console.log("newMovie: ", newMovie);
    res.send(newMovie);
  } catch (err) {
    console.log("error");
  }
});

module.exports = router;

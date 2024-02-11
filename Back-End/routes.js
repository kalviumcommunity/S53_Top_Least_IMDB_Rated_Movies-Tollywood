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

router.get("/:id",async (req,res)=>{
  try{
    const movie = await dataModel.findById(req.params.id)
    res.json(movie)
  }catch(err){
    res.send("err"+err)
  }
})

router.post("/",async(req,res)=>{
  const movie = new dataModel({
    Hero : req.body.Hero,
    Title : req.body.Title,
    Ratings : req.body.Ratings,
    Director : req.body.Director

  })

  try {
    const movie1 = await movie.save()
    res.json(movie1)
    
  } catch (error) {
    console.log(err);
    
  }
})

router.patch("/:id",async (req,res)=>{
  try {
    const movie = await dataModel.findById(req.params.id)
    if(!movie){
      return res.status(404).json({error:"Movie not Found"})
    }
    movie.Ratings = req.body.Ratings
    const movie1 = await movie.save()
  } catch (error) {
    res.send(err)
  }
})


router.delete("/:id",async(req,res)=>{
  try {
    const movie = await dataModel.findByIdAndDelete(req.params.id)
    if(!stunt){
      return res.status(404).json({error: "Movie not found"})
    }
    await movie.remove();
    res.json({message : "Movie deleted successfully"})
  } catch (error) {
    res.status(500).json({error : error.message})
  }
})

module.exports = router;
  

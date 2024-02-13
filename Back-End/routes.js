const express = require("express");
const app = express();
const router = express.Router();
const dataModel = require("./Schema");
app.use(express.json());

router.get("/movies", async (req, res) => {
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

router.post("/create",async(req,res)=>{
  const data = req.body
  const movie = new dataModel(data)
  await movie.save()
  console.log(data)
  try {
    res.send({message: true , movie:movie})
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
})

router.put("/:id",async (req,res)=>{
  try {
    const {id} = req.params
    const data = req.body
    const movie1 =  dataModel.findByIdAndUpdate(id,data)

    if(!movie1){
      return res.status(404).json({error:"Movie not Found"})
    }
 

    const updatedMovie = await movie1.save()
    res.json(movie1);

  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

router.delete("/:id",async(req,res)=>{
  try {
    const movie = await dataModel.findByIdAndDelete(req.params.id)
    if(!movie){
      return res.status(404).json({error: "Movie not found"})
    }
    res.json({message : "Movie deleted successfully"})
  } catch (error) {
    res.status(500).json({error : error.message})
  }
})

module.exports = router;
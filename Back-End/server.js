const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json())
const connectDB = require("./db");
connectDB();
const PORT = process.env.PORT;
const router = require("./routes");
const cors = require("cors");
app.use(cors());
app.use("/movies", router);

app.get("/ping", (req, res) => res.send("pong"));
app.get("/", (req, res) => res.send("Hello!!This is Home Page"));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

const express = require("express");
const app = express();
app.listen(3000);

app.get("/ping", (req, res) => res.send("pong"));

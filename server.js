const express = require("express");
const app = express();
const port = 3000;

//routes
app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log("Error while running server", error);
  }
});

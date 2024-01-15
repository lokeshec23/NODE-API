const express = require("express");
const mongoose = require("mongoose");
const users = require("./models/usersModel");
const cors = require("cors");
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

//Connect to Database
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.vphy1m0.mongodb.net/Node-API")
  .then(() => {
    console.log("MongoDB Connected :)");
  })
  .catch((error) => {
    console.log("Error while connect Mongodb", error);
  });

//Middleware -  to get req in json
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Npm run dev");
});

// To post users details to DB
app.post("/users", async (req, res) => {
  try {
    const user = await users.create(req.body);
    res.status(200).json(user);
    console.log(`user info post successfully, ${user}`)
  } catch (error) {
    console.log(`Error while post users :(, ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

//To get users details from DB
app.get("/users", async (req, res) => {
  try {
    const user = await users.find({}); // To get all users detaisl
    res.status(200).json({ user });
  } catch (error) {
    console.log(`Error while post users :(, ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

// To get only one user details
app.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await users.findOne({ email: email });
    if (user) {
      res.status(200).json({ user });
      console.log(`user info fetch successfully, ${user}`)
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(`Error while post users :(, ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

//Update an user
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await users.findByIdAndUpdate(id, req.body);
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `cannot find user with id ${id}` });
    }
    const updated = await users.findById(id);
    res.status(200).json(updated);
  } catch (error) {
    console.log(`Error while post users :(, ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

//Delete a User
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await users.findByIdAndRemove(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "No user found with this ID!" });
    }
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//To check server is running or not
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port} :)`);
  } else {
    console.log("Error while running server :(", error);
  }
});

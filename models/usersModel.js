const mongoose = require("mongoose");

// To create Schema
const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please enter username"],
    },
    email: {
      type: String,
      required: [true, "please enter email id"],
    },
    password: {
      type: String,
      required: [true, "please enter password"],
    },
  },
  {
    timestamps: true, // this will create createdAt and updatedAt fields automatically
  }
);

// To create model
const users = mongoose.model("users", usersSchema);

module.exports = users;

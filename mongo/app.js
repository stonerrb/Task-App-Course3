const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.get("/insert", async (req, res) => {
  try {
    let fname = req.query.fname;
    let lname = req.query.lname;

    let user = User({
      fname: fname,
      lname: lname,
    });
    let data = await user.save();
    res.send(data);
  } catch (error) {
    res.status(400).send("something went wrong"+error);
  }
});

app.get("/", async (req, res) => {
  try {
    let data = await User.find();
    res.send(data);
  } catch (error) {
    res.status(400).send("something went wrong"+error);
  }
});

app.listen(3000, () => {
  connect();
  console.log("server started!");
});

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://root:varunisvirgin@cluster0.kb7t1qg.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("connected to db!");
    })
    .catch((err) => {
      throw new Error(err);
    });
};

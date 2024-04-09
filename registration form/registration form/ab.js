const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect("mongodb://localhost:27017/user_registration", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  confirmPassword: String,
  birthdate: Date,
  gender: String,
});
const User = mongoose.model("User", userSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
  });

  try {
    const newUser = await user.save();
    res.status(201).send("User registered successfully!");
  } catch (err) {
    res.status(400).send("Error registering user.");
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

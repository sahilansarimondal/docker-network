import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
const app = express();

app.use(express.json());

const mongoUrl = "mongodb://localhost:27017/myDatabase";

// Connect to MongoDB
mongoose
  .connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err: any) => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

app.get("/", async (req, res) => {
  const users = await User.find();

  console.log(users);

  res.status(200).send({
    data: users,
  });
});

app.post("/user", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });

  try {
    const savedUser = await newUser.save();
    res.status(201).send({ message: "User created", user: savedUser });
  } catch (err) {
    res.status(500).send({ message: "Error creating user", error: err });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

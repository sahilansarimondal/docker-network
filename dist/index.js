"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const mongoUrl = "mongodb://localhost:27017/myDatabase";
// Connect to MongoDB
mongoose_1.default
    .connect(mongoUrl)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
const UserSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
});
const User = mongoose_1.default.model("User", UserSchema);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.find();
    console.log(users);
    res.status(200).send({
        data: users,
    });
}));
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    try {
        const savedUser = yield newUser.save();
        res.status(201).send({ message: "User created", user: savedUser });
    }
    catch (err) {
        res.status(500).send({ message: "Error creating user", error: err });
    }
}));
app.listen(3000, () => {
    console.log("server is running on port 3000");
});

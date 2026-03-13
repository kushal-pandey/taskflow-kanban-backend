const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Board = require("../models/Board");
const Column = require("../models/Column");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Register request received:", req.body);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    console.log("User created:", user._id);

    const board = await Board.create({
      title: "My Board",
      user: user._id,
    });

    console.log("Board created:", board._id);

    await Column.insertMany([
      { title: "Todo", board: board._id, user: user._id },
      { title: "In Progress", board: board._id, user: user._id },
      { title: "Done", board: board._id, user: user._id },
    ]);

    console.log("Default columns created");

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.log("===== REGISTER BACKEND ERROR =====");
    console.log(error);
    console.log("===== END ERROR =====");

    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
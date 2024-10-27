const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { sendVerificationEmail } = require("../utils/emailService");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email sudah terdaftar" });

    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    // Kirim email verifikasi
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    savedUser.token = token;
    await savedUser.save();

    sendVerificationEmail(savedUser.email, token);
    res.status(201).json({
      message: "Registrasi berhasil, silakan cek email untuk verifikasi",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Email atau password salah" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token" });

    user.verified = true;
    user.token = null;
    await user.save();

    res.status(200).json({ message: "Email berhasil diverifikasi" });
  } catch (err) {
    res.status(500).json({ message: "Token tidak valid atau kadaluarsa" });
  }
};

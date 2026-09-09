const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function createUserController(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required." });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      return res
        .status(400)
        .json({ error: true, message: "user already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashPassword,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3h" },
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      error: false,
      user: { fulllName: user.fullName, email: user.email },

      message: "Registration Successful",
    });
  } catch (error) {
    console.log("Error while create user :", error.message);
    return res.status(500).json({
      error: true,
      message: "internal server error.",
    });
  }
}

async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3h" },
    );
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      error: false,
      user: { fullName: user.fullName, email: user.email },

      message: "Login Successful",
    });
  } catch (error) {
    console.error("loginUser error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
}

async function getCurrnetUser(req, res) {
  const { userId } = req.user;

 try {
   const isUser = await User.findOne({ _id: userId });
 
   if (!isUser) {
     return res.sendStatus(401);
   }
 
   return res.status(200).json({
     user: isUser,
     message: "user fetch successful.",
   });
 } catch (error) {
   console.error("current get-user error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
 
}

async function logoutController(req, res) {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully" });
}

module.exports = {
  createUserController,
  loginUserController,
  getCurrnetUser,
  logoutController,
};

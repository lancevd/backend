import generateToken from "../lib/generateToken.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const payload = req.body;

  try {
    if (
      !payload.email ||
      !payload.firstName ||
      !payload.lastName ||
      !payload.password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const email = payload.email.toLowerCase();
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //   encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    const newUser = new User({
      ...payload,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
          ...newUser._doc,
          password: undefined,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `An error occured: ${error}` });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // find the user in database
    const user = await User.findOne({ email: email.toLowerCase() });
    // If there is user, check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `An error occured: ${error}` });
  }
};

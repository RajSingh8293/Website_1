import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../modals/user.modals.js";

// register user
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(422).json({ message: "Email is required !" });
    }
    if (!password) {
      return res.status(422).json({ message: "Password is required !" });
    }

    // existing user
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists !" });
    }

    // password hash
    const hashPassword = bcryptjs.hashSync(password, 8);

    const userdata = new User({
      email,
      password: hashPassword,
    });

    const user = await userdata.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("user :", user);

    const { password: pass, ...rest } = user._doc; //  hide passwrod
    const options = {
      httpOnly: true,
      secure: true,
    };
    res.status(201).cookie("token", token, options).json({
      user: rest,
      token: token,
      success: true,
      message: "User logged In Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error with registration",
      error,
    });
  }
};

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!password) {
    return res
      .status(404)
      .json({ success: false, message: "Password is required !" });
  }
  if (!email) {
    return res
      .status(404)
      .json({ success: false, message: "Email is required !" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({
        success: false,
        message: "User does not exists",
      });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      res.status(400).send({
        success: false,
        message: "Invalid data !",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const options = {
      httpOnly: true,
      secure: true,
    };
    const { password: pass, ...rest } = user._doc; // hide password
    res
      .status(200)
      .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000 }, options)
      .json({
        success: true,
        message: "Logged in successfully",
        user: rest,
        token,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with login",
      error,
    });
  }
};

// logout user
export const logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).clearCookie("token", options).json({
      success: true,
      message: "User logged Out",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something wrong with logged Out",
    });
  }
};

// userController.ts

// Imports =========================================

// Models ---
import userModel from "../models/userModel.js";
// Packages ---
import bcrypt from "bcryptjs"; // Hashing passwords
import jwt from "jsonwebtoken"; // Create a JWT

// Controller functions ============================

// Signup -----------------------------------------

export const userSignup = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;

    //Check if user already exists
    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists!!!" });
    }

    const newUser = new userModel({
      firstName,
      email,
      password,
    });

    //Hash the password for the new user in order to save DB
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save(); //save user to DB
    //res.status(201).json(newUser);

    //Create a JWT
    //First, create a payload=user data or other data
    const payload = {
      newUser: {
        id: newUser._id,
        name: newUser.firstName,
        test: "test",
      },
    };

    //Create a JWT using payload
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (error) {
    //console.log(error.stack);
    res.json(error.stack);
  }
};

// Login ------------------------------------------

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    //res.status(200).json({ msg: `Welcome back ${user.firstName}! 🎉` });

    //Create a JWT
    //First, create a payload=user data or other data
    const payload = {
      user: {
        id: user._id,
        name: user.firstName,
      },
    };

    //Create a JWT using payload
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (error) {
    console.log(error.stack);
    res.send(error.message);
  }
};

// Profile ----------------------------------------

export const loggedIn = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.json(error.stack);
  }
};

// Cookie -----------------------------------------

export const cookieUser = async (req, res) => {
  res.cookie("Hello", "BeispielUser!", {
    //maxAge: 60000 = 1 min or 60000 *60 = 1 hour
    httpOnly: true,
    secure: true,
  });

  res.send("Cookie set!");
};

// Get products ----------------------------------

export const getProducts = async (req, res) => {
  //console.log(req.headers.cookie);
  //console.log(req.cookies.Hello);
  if (req.cookies.Hello && req.cookies.Hello === "BeispielUser!") {
    return res.send("User is valid!");
  } else {
    return res.send("User is not valid!");
  }
};

// Get users -------------------------------------
// export const getUsers = async (req, res) => {
//     try {
//       //code here
//       if (req.googleId) {
//         const users = await userModel.find();
//         res.status(200).json({ details: users });
//       }
//     } catch (error) {
//       res.send(error.stack);
//     }
//   };

// Delete user -----------------------------------
//findByIdAndDelete(id)
// export const deleteUser = async (req, res) => {
//     try {
//       await userModel.findByIdAndDelete(req.params.id);
//       res.status(200).json({ message: "User deleted!" });
//     } catch (error) {
//       res.send(error.stack);
//     }
//   };
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/key");

exports.create = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    mobile,
    status,
    accountType,
    password,
  } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        errorMessage: "This is Email is already exists!",
      });
    }

    const newUser = new User();

    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.dateOfBirth = dateOfBirth;
    newUser.mobile = mobile;
    newUser.status = status;
    newUser.accountType = accountType;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    res.json({
      successMessage: "User created successfully!",
    });
  } catch (err) {
    console.log("user created error: ", err);
    res.status(500).json({
      errorMessage: "User created unsuccessfully",
    });
  }
};

exports.update = async (req, res) => {
  const user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ updatedUser, successMessage: "Updated user successfully!" });
  } catch (err) {
    res.status(500).json({ errorMessage: "Updated user unsuccessfully!" });
  }
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errorMessage: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch)

    if (!isMatch) {
      return res
        .status(400)
        .json({ errorMessage: "Invalid email or password!" });
    }

    const payload = {
      user: {
        _id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) console.log("jwt error: " + err);
      const { _id, firstName, email, accountType } = user;

      res.json({
        token,
        user: { _id, firstName, email, accountType },
      });
    });
  } catch (err) {
    console.log("loginController error", err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log("getUsers error", err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};

exports.getuserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log("getuserById error", err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};

exports.deleteById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ successMessage: "User has been deleted..." });
  } catch (err) {
    console.log("deleteById error", err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};

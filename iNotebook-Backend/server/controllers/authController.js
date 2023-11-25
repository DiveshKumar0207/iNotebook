const express = require("express");
const {query, matchedData, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config({path: "../iNotebook-Backend/.env"});

const Users = require("../../db/models/User");

// FIRST : ====================== createuser controller ===============================================
exports.createUser = async (req, res) => {
  // validaion error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  // get validated data
  const validatedData = matchedData(req);

  try {
    // check duplicate email ---if email already exists
    const existingUser = await Users.findOne({email: validatedData.email});
    if (existingUser) {
      return res.status(400).json({message: "Email already in use"});
    }

    const user = new Users({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
      date: req.body.date,
    });

    const newUser = await user.save();

    const payload = {
      users: {
        id: newUser.id,
      },
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);

    return res
      .status(201)
      .json({message: "user created successfully", token: jwtToken});
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res
        .status(422)
        .json({message: "Validation error", errors: error.errors});
    } else if (error.code === 11000) {
      // Duplicate key error: Unique constraint violated
      return res
        .status(400)
        .json({message: "Duplicate key error: Unique constraint violated"});
    } else {
      return res.status(500).json({message: "Internal Server Error"});
    }
  }
};

// SECOND:  ====================== AUTHENTICATE USER : LOG-IN  ===============================================
exports.login = async (req, res) => {
  // validaion error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  // get validated data
  const validatedData = matchedData(req);

  try {
    const existingUser = await Users.findOne({email: validatedData.email});
    if (!existingUser) {
      return res.status(401).json({message: "unauthorized"});
    }

    const checkPassword = await bcrypt.compareSync(
      validatedData.password,
      existingUser.password
    );
    if (!checkPassword) {
      return res.status(401).json({message: "unauthorized"});
    }

    const payload = {
      users: {
        id: existingUser.id,
      },
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({message: "success login", token: jwtToken});
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res
        .status(422)
        .json({message: "Validation error", errors: error.errors});
    } else if (error.code === 11000) {
      return res
        .status(400)
        .json({message: "Duplicate key error: Unique constraint violated"});
    } else {
      return res.status(500).json({message: "Internal Server Error"});
    }
  }
};

// THIRD:  ======================  GET USER DATA  ===============================================

exports.getuser = async (req, res) => {
  try {
    // from verifyJwt middleware --- we set decoded.user to req.user
    const requiredUserID = req.user.id;

    const user = await Users.findById(requiredUserID).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res
        .status(422)
        .json({message: "Validation error", errors: error.errors});
    } else if (error.code === 11000) {
      return res
        .status(400)
        .json({message: "Duplicate key error: Unique constraint violated"});
    } else {
      return res.status(500).json({message: "Internal Server Error"});
    }
  }
};

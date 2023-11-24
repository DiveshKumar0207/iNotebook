const express = require("express");
const router = express.Router();
const {body, query} = require("express-validator");

const noteControllers = require("../controllers/noteController");
const authControllers = require("../controllers/authController");

const verifyToken = require("../../middleware/verifyJwt");

// ROUTE-1: ====================== CREATE A USER =======================
router.post(
  "/createuser",
  [
    body("name").trim().isLength({min: 3}).escape(),
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Enter valid email"),
    body("password")
      .trim()
      .isLength({min: 8})
      .withMessage("Password must be at least 8 characters long")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one digit")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character")
      .escape(),
    body("confirmPassword").custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  authControllers.createUser
);

// ROUTE-2:  ===============================  LOGIN =======================================
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Enter valid email"),
    body("password").exists().trim().escape(),
  ],
  authControllers.login
);

// ROUTE-3 ====================== GET USER-DATA ============================================
router.post("/getuser", verifyToken, authControllers.getuser);

// ROUTE-1 ======================  CREATE NOTES =================================================
router.post(
  "/createNote",
  [
    body("title").trim().isLength({min: 3}).escape(),
    body("description")
      .trim()
      .isLength({min: 10})
      .escape()
      .withMessage("Enter at least 10 characters"),
    body("tag").trim().isLength({min: 3}).escape(),
  ],
  verifyToken,
  noteControllers.createNote
);

// ROUTE-4 ====================== FETCH ALL NOTES ============================================
router.get("/fetchnote", verifyToken, noteControllers.fetchNotes);

// ROUTE-5 ====================== FETCH ALL NOTES ============================================
router.put(
  "/updatenote/:id",
  [
    body("title").trim().isLength({min: 3}).escape(),
    body("description")
      .trim()
      .isLength({min: 10})
      .escape()
      .withMessage("Enter at least 10 characters"),
    body("tag").trim().isLength({min: 3}).escape(),
  ],
  verifyToken,
  noteControllers.updateNotes
);

// ROUTE-6 ====================== FETCH ALL NOTES ============================================
router.delete("/deletenote/:id", verifyToken, noteControllers.deleteNotes);

module.exports = router;

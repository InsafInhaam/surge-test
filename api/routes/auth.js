const express = require("express");
const router = express.Router();
const { loginValidator, validatorResult } = require("../middleware/validator");
const {
  loginController,
  getUsers,
  create,
  getuserById,
  deleteById,
  update,
} = require("../controllers/auth");
const { authenticatateJWT } = require("../middleware/authenticator");

router.post("/login", loginValidator, validatorResult, loginController);

router.get("/", getUsers);

router.post("/create", authenticatateJWT, create);

router.get("/find/:id", getuserById);

router.delete("/delete/:id", authenticatateJWT, deleteById);

router.put("/:id", authenticatateJWT, update);

module.exports = router;

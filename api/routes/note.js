const express = require("express");
const router = express.Router();
const { create, getNoteByUser } = require("../controllers/note");
const { authenticatateJWT } = require("../middleware/authenticator");

router.post("/", authenticatateJWT, create);

router.get("/find/:userId", getNoteByUser);

module.exports = router;

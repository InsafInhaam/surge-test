const express = require("express");
const router = express.Router();
const {
  create,
  getNoteByUser,
  update,
  deleteNote,
  getNoteById,
} = require("../controllers/note");
const { authenticatateJWT } = require("../middleware/authenticator");

router.post("/", authenticatateJWT, create);

router.get("/find/:userId", getNoteByUser);

router.put("/:id", authenticatateJWT, update);

router.delete("/:id", authenticatateJWT, deleteNote);

router.get("/:id", getNoteById);

module.exports = router;

const Note = require("../models/note");

exports.create = async (req, res) => {
  const newNote = new Note(req.body);
  try {
    const savedNote = await newNote.save();
    res.status(200).json({
      successMessage: `${savedNote.title} was created successfully`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getNoteByUser = async (req, res) => {
  try {
    const notes = await Note.find({ user_id: req.params.userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (err) {
    console.log("getNoteById error", err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ updatedNote, successMessage: "Updated note successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({
      successMessage: "note has been deleted...",
    });
  } catch (err) {
    res.status(500).json({ errorMessage: "Note not been deleted" });
  }
};

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

// console.log(req.user);
// setTimeout(() => {
//   res.json({
//     successMessage: `${req.body.title} was successfully created`,
//   });
// }, 5000);

import notes from '../models/noteModel.js';
import mongoose from 'mongoose';

export const getNotes = async (req, res) => {
  try {
    const allNotes = await notes.find();
    res.status(200).json(allNotes);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const createNote = async (req, res) => {
  const { title, description, date, message } = req.body;
  const newNote = new notes({
    title,
    description,
    date,
    creator: req.userId,
    createdAt: new Date().toISOString(),
    checked: false,
  });
  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .send(`no note is available with id:${id}`);
  await notes.findByIdAndRemove(id);

  res.json({ message: 'Note deleted successfully' });
};

export const updateNote = async (req, res) => {
  const { id: _id } = req.params;
  const note = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .send(`No note is available with id:${id}`);
  const updatedNote = await notes.findByIdAndUpdate(
    _id,
    { ...note, _id },
    { new: true }
  );
  res.json(updatedNote);
};

export const toggleNoteDone = async (req, res) => {
  try {
    const noteRef = await notes.findById(req.params.id);

    const note = await notes.findOneAndUpdate(
      { _id: req.params.id },
      { done: !noteRef.done }
    );

    await note.save();

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

import express from 'express';
import {
  createNote,
  deleteNote,
  updateNote,
  getNotes,
  toggleNoteDone,
} from '../controllers/noteController.js';
import auth from '../utils/auth.js';

const router = express.Router();

router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/:id', toggleNoteDone);

export default router;

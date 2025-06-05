import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  addProblemsToPlaylist,
  addSingleProblemToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllPlaylistDetails,
  getPlaylistById,
  removeProblemsFromPlaylist,
} from '../controllers/playlist.controller.js';

const playlistRoutes = express.Router();

playlistRoutes.post('/create', authMiddleware, createPlaylist);
playlistRoutes.post('/:playlistId/add-problems', authMiddleware, addProblemsToPlaylist);
playlistRoutes.post('/add-problem', authMiddleware, addSingleProblemToPlaylist);
playlistRoutes.get('/get-all', authMiddleware, getAllPlaylistDetails);
playlistRoutes.get('/:playlistId', authMiddleware, getPlaylistById);
playlistRoutes.delete('/delete/:playlistId', authMiddleware, deletePlaylist);
playlistRoutes.delete('/:playlistId/remove-problems', authMiddleware, removeProblemsFromPlaylist);

export default playlistRoutes;

import { db } from '../libs/db.js';

export const createPlaylist = async (req, res) => {
  const { id: userId } = req.user;

  const { name, description } = req.body;

  try {
    const playlist = await db.Playlist.create({
      data: {
        name,
        description,
        createdBy: userId,
      },
    });

    if (!playlist) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create playlist.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Playlist created successfully.',
      data: playlist,
    });
  } catch (error) {
    console.log('Error while creating playlist', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create playlist.',
    });
  }
};

export const addProblemsToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'No problems provided.',
    });
  }

  try {
    const problemsInPlaylist = await db.ProblemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId,
        problemId,
      })),
    });

    if (!problemsInPlaylist || problemsInPlaylist.length === 0) {
      return res.status(500).json({
        success: false,
        error: 'Failed to add problems to playlist.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Problems added to playlist successfully.',
      data: problemsInPlaylist,
    });
  } catch (error) {
    console.log('Error while adding problems to playlist', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to add problems to playlist.',
    });
  }
};

export const getAllPlaylistDetails = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const playlists = await db.Playlist.findMany({
      where: { createdBy: userId },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Playlists fetched successfully.',
      data: playlists,
    });
  } catch (error) {
    console.log('Error while fetching playlists', error);
    return res.status(500).json({
      success: false,
      error: 'Error while fetching playlists.',
    });
  }
};

export const getPlaylistById = async (req, res) => {
  const { playlistId } = req.params;
  const { id: userId } = req.user;
  try {
    const playlistDetails = await db.Playlist.findUnique({
      where: {
        id: playlistId,
        createdBy: userId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlistDetails) {
      return res.status(404).json({
        success: false,
        error: 'Playlist not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Playlist fetched successfully.',
      data: playlistDetails,
    });
  } catch (error) {
    console.log('Error while fetching playlist details', error);
    return res.status(500).json({
      success: false,
      error: 'Error while fetching playlist details.',
    });
  }
};

export const deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { id: userId } = req.user;

  try {
    const playlist = await db.Playlist.findUnique({
      where: {
        id: playlistId,
        createdBy: userId,
      },
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        error: 'Playlist not found.',
      });
    }

    await db.Playlist.delete({
      where: {
        id: playlistId,
        createdBy: userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Playlist deleted successfully.',
      data: playlist,
    });
  } catch (error) {
    console.log('Error while deleting playlist', error);
    return res.status(500).json({
      success: false,
      error: 'Error while deleting playlist.',
    });
  }
};

export const removeProblemsFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'No problems provided.',
    });
  }

  try {
    const deletedProblems = await db.ProblemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Problems removed from playlist successfully.',
      data: deletedProblems,
    });
  } catch (error) {
    console.log('Error while removing problems from playlist', error);
    return res.status(500).json({
      success: false,
      error: 'Error while removing problems from playlist.',
    });
  }
};

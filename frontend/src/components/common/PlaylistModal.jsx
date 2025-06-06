import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useAddProblemsToPlaylist } from '../../hooks/reactQuery/usePlaylistApi';
import toast from 'react-hot-toast';
import { useState } from 'react';
import queryClient from '../../utils/queryClient';
import { QUERY_KEYS } from '../../constants/keys';

const PlaylistModal = ({ problemId, allPlaylists }) => {
  const [playlistAddDetails, setPlaylistAddDetails] = useState({
    playlistId: null,
  });

  const { mutate: addProblemToPlaylist } = useAddProblemsToPlaylist();

  const { isAuthenticated } = useAuthStore();

  const addToPlaylist = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add problem to playlist');
      return;
    }
    if (!playlistAddDetails.playlistId || !problemId) {
      toast.error('Please select a playlist');
      return;
    }

    const modal = document.getElementById('add_to_playlist');
    if (modal) {
      modal.close();
    }

    addProblemToPlaylist(
      {
        playlistId: playlistAddDetails.playlistId,
        problemId,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || 'Added to playlist successfully');
          queryClient.invalidateQueries(QUERY_KEYS.PLAYLISTS);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.error || 'Something went wrong');
        },
      }
    );
    setPlaylistAddDetails({
      problemId: null,
      playlistId: null,
    });
    // console.log(playlistAddDetails);
  };
  return (
    <div>
      {/* playlist add modal */}
      <dialog id="add_to_playlist" className="modal">
        <div className="modal-box w-70">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg my-2">Select a playlist</h3>
            {allPlaylists?.length > 0 ? (
              <div>
                <select
                  className="select select-primary"
                  onChange={(e) =>
                    setPlaylistAddDetails((prev) => ({ ...prev, playlistId: e.target.value }))
                  }
                  value={playlistAddDetails.playlistId || 'default'}
                >
                  <option disabled={true} value="default">
                    Select a playlist to update
                  </option>
                  {allPlaylists?.map((playlist) => (
                    <option key={playlist.id} value={playlist?.id}>
                      {playlist?.name}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="btn btn-primary text-wrap mt-3 "
                  onClick={addToPlaylist}
                >
                  Add
                </button>
              </div>
            ) : (
              <p className="text-center text-sm p-4">
                No playlist available. Please create a new playlist
              </p>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PlaylistModal;

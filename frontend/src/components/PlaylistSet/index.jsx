import { BookMarked, LibraryBig, PlusCircle, Shuffle, Trash2, UserCircle } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCreatePlaylist, useGetAllPlaylists } from '../../hooks/reactQuery/usePlaylistApi';
import { MyLoader } from '../common';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const PlaylistSet = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data, isLoading } = useGetAllPlaylists();

  const navigate = useNavigate();

  const { authUser } = useAuthStore();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      toast.error('Please fill in all the fields');
      return;
    }
    createPlaylist(formData, {
      onSuccess: ({ message }) => {
        toast.success(message || 'Success');
        setFormData({
          name: '',
          description: '',
        });
        const modal = document.getElementById('create_playlist');
        if (modal) {
          modal.close();
        }
      },
      onError: (err) => {
        toast.error(err.response.data?.error || 'Something went wrong');
      },
    });
  };
  console.log(data);

  if (isLoading) return <MyLoader />;

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b">
            <h2 className="card-title text-2xl md:text-3xl flex items-center gap-3">
              <BookMarked className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              My Playlist
            </h2>
            <button
              className="flex items-center text-lg gap-2 btn btn-primary"
              type="button"
              onClick={() => document.getElementById('create_playlist').showModal()}
            >
              <PlusCircle />
              Create new one
            </button>

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="create_playlist" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <div>
                  <h3 className="font-bold text-lg">Create a playlist</h3>
                  <form onSubmit={handleFormSubmit} className="py-4 space-y-2">
                    <label htmlFor="name">Enter the playlist name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Playlist name"
                      className="input input-bordered w-full"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <label htmlFor="description">Enter the playlist description</label>
                    <input
                      id="description"
                      type="text"
                      placeholder="Playlist description"
                      className="input input-bordered w-full"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <button type="submit" className="btn btn-primary">
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          {/* // playlists */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {data?.data?.map((playlist) => (
              <div
                key={playlist?.id}
                className=" border shadow border-base-200 rounded-lg p-4 space-y-2"
              >
                <h3 className="text-2xl font-semibold">{playlist?.name}</h3>
                <div className="flex items-center gap-2">
                  <UserCircle className="w-4" />
                  {authUser?.name}
                </div>
                <p className=" opacity-80">{playlist?.description}</p>
                <p className="text-lg">
                  <strong>{playlist?.problems?.length}</strong> Problems added
                </p>
                <div className="flex items-center gap-4 justify-between flex-wrap">
                  <button
                    onClick={() => navigate(`/playlists/${playlist?.id}`)}
                    type="button"
                    className="flex items-center gap-2 btn btn-success"
                  >
                    <Shuffle className="w-4" /> Explore
                  </button>
                  <button className="flex items-center gap-2 btn btn-error">
                    <Trash2 className="w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSet;

import { Book, BookMarked, LinkIcon, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  useGetPlaylistById,
  useRemoveSingleProblemFromPlaylist,
} from '../../hooks/reactQuery/usePlaylistApi';
import { DeleteModal, MyLoader, PaginatedTable } from '../common';
import formatDate from '../../utils/formatDate';
import { useAuthStore } from '../../stores/useAuthStore';
import toast from 'react-hot-toast';
import queryClient from '../../utils/queryClient';
import { QUERY_KEYS } from '../../constants/keys';

const Playlist = () => {
  const [entryToDelete, setEntryToDelete] = useState(null);
  const { playlistId } = useParams();

  const { problemsSolved } = useAuthStore();

  const { data, isLoading } = useGetPlaylistById(playlistId);
  const { mutate: removeProblem } = useRemoveSingleProblemFromPlaylist();

  const handleDeleteProblem = () => {
    if (!entryToDelete) {
      return;
    }

    removeProblem(entryToDelete, {
      onSuccess: ({ message }) => {
        toast.success(message || 'Problem removed successfully');
        queryClient.invalidateQueries([QUERY_KEYS.PLAYLISTS, playlistId]);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.error || 'Something went wrong');
      },
    });

    setEntryToDelete(null);
  };

  if (isLoading) {
    return <MyLoader />;
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6 md:p-8">
          <div className=" pb-4 border-b flex items-center gap-4">
            <BookMarked className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <div className="flex flex-col">
              <h3 className="font-bold text-2xl">{data?.data?.name}</h3>
              <p>{data?.data?.description}</p>
            </div>
          </div>

          {/* Table */}
          <PaginatedTable
            data={data?.data?.problems || []}
            itemsPerPage={10}
            columns={[
              { label: '#', sortKey: '' },
              { label: 'Solved', sortKey: '' },
              { label: 'Title', sortKey: '' },
              { label: 'Tags', sortKey: '' },
              { label: 'Added on', sortKey: '' },
              { label: 'Difficulty', sortKey: '' },
              { label: 'Actions', sortKey: '' },
            ]}
            renderRow={(entry, index) => (
              <tr key={entry.id} className="text-center">
                <td>{index + 1}</td>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={problemsSolved.includes(entry?.problemId)}
                    readOnly
                  />
                </td>
                <td>
                  <Link
                    to={`/problems/${entry?.problemId}`}
                    className="text-primary link text-left"
                  >
                    {entry?.problem?.title}
                  </Link>
                </td>
                <td className="capitalize">{entry?.problem?.tags?.join(', ') || 'N/A'}</td>
                <td>{formatDate(entry?.createdAt)}</td>
                <td>
                  <span
                    className={`badge ${
                      entry.difficulty === 'EASY'
                        ? 'badge-success'
                        : entry.difficulty === 'MEDIUM'
                        ? 'badge-warning'
                        : 'badge-error'
                    }`}
                  >
                    {entry.difficulty === 'EASY'
                      ? 'Easy'
                      : entry.difficulty === 'MEDIUM'
                      ? 'Med.'
                      : 'Hard'}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setEntryToDelete(entry?.id);
                      document.getElementById('delete_problem_in_playlist_modal').showModal();
                    }}
                    className="btn btn-xs btn-outline btn-error gap-1"
                  >
                    <Trash className="w-4" />
                  </button>
                </td>
              </tr>
            )}
            noDataMessage={
              <tr>
                <td colSpan="7" className="text-center space-y-3">
                  <p className="text-md opacity-70 p-5">
                    No problems added to this playlist. <br /> Kindly add problems from the problems
                    page.
                  </p>
                  <Link to="/problems" className="btn btn-outline mt-4">
                    <LinkIcon className="w-4 h-4" />
                    Go to problems page
                  </Link>
                </td>
              </tr>
            }
          />

          {/* Delete Modal */}
          <DeleteModal
            modalId="delete_problem_in_playlist_modal"
            title="Remove Problem from the playlist"
            message={`Are you sure you want to remove the problem from the playlist?`}
            onDelete={handleDeleteProblem}
          />
        </div>
      </div>
    </div>
  );
};

export default Playlist;

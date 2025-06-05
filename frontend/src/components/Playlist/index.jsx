import { Book, BookMarked, Trash } from 'lucide-react';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPlaylistById } from '../../hooks/reactQuery/usePlaylistApi';
import { MyLoader } from '../common';
import formatDate from '../../utils/formatDate';

const Playlist = () => {
  const { playlistId } = useParams();

  const { data, isLoading } = useGetPlaylistById(playlistId);
  console.log(data);

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
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-sm">
              <thead>
                <tr className="text-base-content/70 text-center font-semibold">
                  <th>#</th>
                  {/* <th>Solved</th> */}
                  <th>Title</th>
                  {/* <th>Acceptance</th> */}
                  <th>Tags</th>
                  <th>Added on</th>
                  <th>Difficulty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data?.data?.problems?.length > 0 ? (
                  data?.data?.problems?.map((problem, index) => (
                    <tr key={problem.id}>
                      <td>{index + 1}</td>
                      {/* <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={problem?.isSolved} // TODO: Store solved problems
                          readOnly
                          // disabled
                        />
                      </td> */}
                      <td>
                        <Link
                          to={`/problems/${problem?.problemId}`}
                          className="text-primary link text-left"
                        >
                          {problem?.problem?.title}
                        </Link>
                      </td>
                      <td className="capitalize">{problem?.problem?.tags?.join(', ') || 'N/A'}</td>
                      <td>{formatDate(problem?.createdAt)}</td>
                      <td>
                        <span
                          className={`badge ${
                            problem.difficulty === 'EASY'
                              ? 'badge-success'
                              : problem.difficulty === 'MEDIUM'
                              ? 'badge-warning'
                              : 'badge-error'
                          }`}
                        >
                          {problem.difficulty === 'EASY'
                            ? 'Easy'
                            : problem.difficulty === 'MEDIUM'
                            ? 'Med.'
                            : 'Hard'}
                        </span>
                      </td>
                      <td className="flex flex-wrap gap-2">
                        <button className="btn btn-xs btn-outline btn-error gap-1">
                          <Trash className="w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center space-y-3">
                      <p className="text-md opacity-70 p-5">
                        No problems added to this playlist. <br /> kindly add the problems through
                        problem page
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;

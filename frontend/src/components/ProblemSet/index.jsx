import { useEffect, useState } from 'react';
import {
  FileJson,
  ListPlus,
  Pencil,
  Trash,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Bookmark,
  Search,
  BookmarkPlusIcon,
  Tag,
  BriefcaseBusiness,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAllProblems } from '../../hooks/reactQuery/useProblemApi';
import { toast } from 'react-hot-toast';
import { COMPANIES_NAME, TAG_OPTIONS } from '../../constants/problemDetails';
import { useAuthStore } from '../../stores/useAuthStore';
import { useGetAllPlaylists } from '../../hooks/reactQuery/usePlaylistApi';
import { DeleteModal, MyLoader, PaginatedTable, PlaylistModal } from '../common';
import { useDeleteProblem } from '../../hooks/reactQuery/useAdminApi';
import queryClient from '../../utils/queryClient';
import { QUERY_KEYS } from '../../constants/keys';

const ProblemSet = () => {
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [problemIdForPlaylist, setProblemIdForPlaylist] = useState(null);
  const [problemToDelete, setProblemToDelete] = useState({ id: null, title: null });

  const { data, isLoading, isError, error } = useGetAllProblems();
  const { data: allPlaylists } = useGetAllPlaylists();
  const { mutate: deleteProblem } = useDeleteProblem();

  const { authUser, isAuthenticated, problemsSolved } = useAuthStore();

  useEffect(() => {
    if (!data?.data) return;

    const updatedData = data.data
      .map((p) => ({
        ...p,
        solved: problemsSolved.includes(p.id), // inject "solved" status
      }))
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (difficultyFilter ? p.difficulty === difficultyFilter : true))
      .filter((p) => (companyFilter ? p.companies.includes(companyFilter) : true))
      .filter((p) => (tagFilter ? p.tags.includes(tagFilter) : true))
      .sort((a, b) => {
        if (!sortBy) return 0;

        if (sortBy === 'solved') {
          return sortAsc
            ? Number(b.solved) - Number(a.solved)
            : Number(a.solved) - Number(b.solved);
        }

        const valA = a[sortBy];
        const valB = b[sortBy];

        if (typeof valA === 'string') {
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
          return sortAsc ? valA - valB : valB - valA;
        }
      });

    setFilteredProblems(updatedData);
  }, [data, problemsSolved, search, difficultyFilter, companyFilter, tagFilter, sortBy, sortAsc]);

  const handleSortChange = ({ key, asc }) => {
    setSortBy(key);
    setSortAsc(asc);
  };

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.showModal();
    } else return;
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.close();
    } else return;
  };

  const handleDeleteProblem = () => {
    if (!problemToDelete.id) {
      toast.error('Please select a problem to delete');
      return;
    }
    deleteProblem(problemToDelete.id, {
      onSuccess: ({ message }) => {
        toast.success(message || 'Problem deleted successfully');
        setProblemToDelete({ id: null, title: null });
        queryClient.invalidateQueries(QUERY_KEYS.PROBLEMS);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.error || 'Something went wrong');
      },
    });
    closeModal('delete_problem_modal');
  };

  if (isLoading) {
    return <MyLoader />;
  }

  if (isError) {
    toast.error(error?.error || 'Something went wrong');
  }

  // console.log(data?.data?.map((p) => p.tags).flat());
  const availableCompanies = Array.from(new Set(data?.data?.flatMap((p) => p?.companies)));
  const availableTags = Array.from(new Set(data?.data?.flatMap((p) => p?.tags)));

  // console.log(availableCompanies);
  // console.log(availableTags);

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h2 className="card-title text-2xl md:text-3xl flex items-center gap-3">
              <FileJson className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Problems
            </h2>
            <label className="input">
              <Search className="w-4 h-4" />
              <input
                type="search"
                required
                placeholder="Search problems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" w-full md:max-w-xs"
              />
            </label>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              className="select select-bordered"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="">All Difficulties</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>

            <select
              className="select select-bordered"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            >
              <option value="">All Tags</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag} className="capitalize">
                  {tag.toLowerCase()}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered"
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
            >
              <option value="">All Companies</option>
              {availableCompanies.map((comp) => (
                <option key={comp} value={comp} className="capitalize">
                  {comp.toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}

          <PaginatedTable
            data={filteredProblems}
            itemsPerPage={10}
            columns={[
              { label: '#', sortKey: '' },
              { label: 'Solved', sortKey: 'solved' },
              { label: 'Title', sortKey: 'title' },
              { label: 'Difficulty', sortKey: 'difficulty' },
              { label: 'Company', sortKey: '' },
              { label: 'Topics', sortKey: '' },
              { label: 'Actions', sortKey: '' },
            ]}
            sortConfig={{ key: sortBy, asc: sortAsc }}
            onSortChange={handleSortChange}
            renderRow={(problem, index) => (
              <tr key={problem.id} className="text-center">
                <td>{index + 1}</td>

                <td>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={problemsSolved.includes(problem?.id)}
                    readOnly
                  />
                </td>

                <td className="text-left">
                  <Link to={`/problems/${problem?.id}`} className="link-hover">
                    {problem?.title}
                  </Link>
                </td>

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

                <td>
                  <div
                    className="tooltip tooltip-top"
                    data-tip={
                      problem.companies?.length ? problem.companies.join(', ') : 'No company'
                    }
                  >
                    <BriefcaseBusiness className="w-4 h-4 mx-auto text-base-content" />
                  </div>
                </td>

                <td>
                  <div
                    className="tooltip tooltip-top"
                    data-tip={problem.tags?.length ? problem.tags.join(', ') : 'No topics'}
                  >
                    <Tag className="w-4 h-4 mx-auto text-base-content" />
                  </div>
                </td>

                {/* Actions */}
                <td className="flex flex-wrap gap-2 text-center justify-center">
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip={isAuthenticated ? 'Save to playlist' : 'Login to save to playlist'}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        openModal('add_to_playlist');
                        setProblemIdForPlaylist(problem?.id);
                      }}
                      className="btn btn-xs btn-outline btn-primary gap-1"
                      disabled={!isAuthenticated}
                    >
                      <BookmarkPlusIcon className="w-4" />
                    </button>
                  </div>

                  {isAuthenticated && authUser?.role === 'ADMIN' && (
                    <div className="tooltip tooltip-bottom" data-tip="Delete Problem">
                      <button
                        className="btn btn-xs btn-outline btn-error gap-1"
                        onClick={() => {
                          setProblemToDelete({
                            id: problem?.id,
                            title: problem?.title,
                          });
                          openModal('delete_problem_modal');
                        }}
                      >
                        <Trash className="w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            )}
          />

          {/* Modal */}

          <PlaylistModal allPlaylists={allPlaylists?.data} problemId={problemIdForPlaylist} />

          {/* Delete Problem Modal */}
          <DeleteModal
            modalId="delete_problem_modal"
            title="Delete this problem?"
            message={`Are you sure you want to delete the problem "${problemToDelete.title}" ? This action cannot be undone.`}
            onDelete={handleDeleteProblem}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemSet;

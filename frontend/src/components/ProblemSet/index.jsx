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
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAllProblems } from '../../hooks/reactQuery/useProblemApi';
import { toast } from 'react-hot-toast';
import { COMPANIES_NAME, TAG_OPTIONS } from '../../constants/problemDetails';
import { useAuthStore } from '../../stores/useAuthStore';

const ProblemSet = () => {
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [filteredProblems, setFilteredProblems] = useState([]);

  const { data, isLoading, isError, error } = useGetAllProblems();
  const { authUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const updatedData = data?.data
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (difficultyFilter ? p.difficulty === difficultyFilter : true))
      .filter((p) => (companyFilter ? p.companies.includes(companyFilter) : true))
      .filter((p) => (tagFilter ? p.tags.includes(tagFilter) : true))
      .sort((a, b) => {
        if (!sortBy) return 0;
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (typeof valA === 'string') {
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
          return sortAsc ? valA - valB : valB - valA;
        }
      });

    setFilteredProblems(updatedData);
  }, [data, search, difficultyFilter, companyFilter, tagFilter, sortBy, sortAsc]);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    toast.error(error?.error || 'Something went wrong');
  }

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
              {TAG_OPTIONS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered"
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
            >
              <option value="">All Companies</option>
              {COMPANIES_NAME.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-sm">
              <thead>
                <tr className="text-base-content/70">
                  <th>#</th>
                  {/* <th>Solved</th> */}
                  <th onClick={() => handleSort('solved')} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      Solved{' '}
                      {sortBy === 'solved' ? (
                        sortAsc ? (
                          <ArrowUp className="w-5" />
                        ) : (
                          <ArrowDown className="w-5" />
                        )
                      ) : (
                        <ArrowUpDown className="w-5" />
                      )}
                    </div>
                  </th>
                  <th onClick={() => handleSort('title')} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      Title{' '}
                      {sortBy === 'title' ? (
                        sortAsc ? (
                          <ArrowUp className="w-5" />
                        ) : (
                          <ArrowDown className="w-5" />
                        )
                      ) : (
                        <ArrowUpDown className="w-5" />
                      )}
                    </div>
                  </th>
                  <th onClick={() => handleSort('acceptance')} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      Acceptance{' '}
                      {sortBy === 'acceptance' ? (
                        sortAsc ? (
                          <ArrowUp className="w-5" />
                        ) : (
                          <ArrowDown className="w-5" />
                        )
                      ) : (
                        <ArrowUpDown className="w-5" />
                      )}
                    </div>
                  </th>
                  <th onClick={() => handleSort('difficulty')} className="cursor-pointer ">
                    <div className="flex items-center gap-2">
                      Difficulty{' '}
                      {sortBy === 'difficulty' ? (
                        sortAsc ? (
                          <ArrowUp className="w-5" />
                        ) : (
                          <ArrowDown className="w-5" />
                        )
                      ) : (
                        <ArrowUpDown className="w-5" />
                      )}
                    </div>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems?.length > 0 ? (
                  filteredProblems?.map((problem, index) => (
                    <tr key={problem.id}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={isAuthenticated && problem?.isSolved} // TODO: Store solved problems
                          readOnly
                          // disabled
                        />
                      </td>
                      <td>
                        <Link to={`/problems/${problem?.id}`}>{problem?.title}</Link>
                      </td>
                      {/* <td>{problem.acceptance.toFixed(1)}%</td> */}
                      <td>75%</td>
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
                        <button className="btn btn-xs btn-outline btn-primary gap-1">
                          <Bookmark className="w-4" />
                        </button>
                        {isAuthenticated && authUser?.role === 'ADMIN' && (
                          <>
                            <button className="btn btn-xs btn-outline btn-accent gap-1">
                              <Pencil className="w-4" />
                            </button>
                            <button className="btn btn-xs btn-outline btn-error gap-1">
                              <Trash className="w-4" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <p className="text-md opacity-70 p-5">No problems found</p>
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

export default ProblemSet;

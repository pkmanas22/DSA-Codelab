import { useState } from 'react';
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

const dummyProblems = [
  {
    id: 'e2aa94f4-84dc-46cb-9f8b-bd3a4462eb1f',
    title: 'Two Sum',
    acceptance: 55.7,
    difficulty: 'Easy',
    solved: true,
    companies: ['Google', 'Amazon'],
    tags: ['Array', 'HashMap', 'Two Pointers', 'Binary Search'],
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    acceptance: 46.1,
    difficulty: 'Medium',
    solved: false,
    companies: ['Microsoft', 'Meta'],
    tags: ['Linked List', 'Math', 'Recursion'],
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    acceptance: 36.8,
    difficulty: 'Medium',
    solved: true,
    companies: ['Amazon'],
    tags: ['String', 'HashMap', 'Sliding Window'],
  },
  {
    id: 4,
    title: 'Median of Two Sorted Arrays',
    acceptance: 43.7,
    difficulty: 'Hard',
    solved: true,
    companies: ['Google', 'Apple'],
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
  },
];

const allCompanies = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'];
const allTags = ['Array', 'HashMap', 'Two Pointers', 'Binary Search'];
const isAdmin = true;

const ProblemSet = () => {
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  const filteredProblems = dummyProblems
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
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              className="select select-bordered"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
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
              {allCompanies.map((c) => (
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
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((problem, index) => (
                    <tr key={problem.id}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={problem.solved}
                          readOnly
                          // disabled
                        />
                      </td>
                      <td>
                        <Link to={`/problems/${problem.id}`}>{problem.title}</Link>
                      </td>
                      <td>{problem.acceptance.toFixed(1)}%</td>
                      <td>
                        <span
                          className={`badge ${
                            problem.difficulty === 'Easy'
                              ? 'badge-success'
                              : problem.difficulty === 'Medium'
                              ? 'badge-warning'
                              : 'badge-error'
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="flex flex-wrap gap-2">
                        <button className="btn btn-xs btn-outline btn-primary gap-1">
                          <Bookmark className="w-4" />
                        </button>
                        {isAdmin && (
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

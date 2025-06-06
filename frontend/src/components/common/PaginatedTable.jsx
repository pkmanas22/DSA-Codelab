import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

const PaginatedTable = ({
  data = [],
  columns = [],
  renderRow,
  itemsPerPage = 10,
  sortConfig = {},
  onSortChange = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSort = (key) => {
    setCurrentPage(1);
    if (!key) return;
    if (sortConfig.key === key) {
      onSortChange({ key, asc: !sortConfig.asc });
    } else {
      onSortChange({ key, asc: true });
    }
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="w-4 h-4" />;
    return sortConfig.asc ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  return (
    <div className="w-full mt-4">
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr className="text-base-content/100">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.sortKey && handleSort(col.sortKey)}
                  className={col.sortKey ? 'cursor-pointer select-none' : ''}
                >
                  <div className="flex items-center gap-1 justify-center">
                    {col.label}
                    {col.sortKey && renderSortIcon(col.sortKey)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => renderRow(item, startIdx + index))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-5 opacity-70">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="join mt-4 flex justify-center">
          <button
            className="join-item btn btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`join-item btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="join-item btn btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedTable;

import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useGetAllSubmissions } from '../../hooks/reactQuery/useSubmissionApi';
import toast from 'react-hot-toast';
import { MyLoader, PaginatedTable } from '../common';
import { calculateAverageMemory, calculateAverageTime } from '../../utils/calculation';
import formatDate from '../../utils/formatDate';

const SubmissionsSet = () => {
  const { data, isLoading, isError, error } = useGetAllSubmissions();

  if (isLoading) return <MyLoader />;
  if (isError) toast.error(error?.error || 'Something went wrong');

  const submissions = data?.data || [];

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b">
            <h2 className="card-title text-2xl md:text-3xl flex items-center gap-3">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              My Submissions
            </h2>
          </div>

          <PaginatedTable
            data={submissions}
            itemsPerPage={20}
            columns={[
              { label: '#', sortKey: null },
              { label: 'Question', sortKey: null },
              { label: 'Submitted On', sortKey: null },
              { label: 'Status', sortKey: null },
              { label: 'Language', sortKey: null },
              { label: 'Avg Time & Memory', sortKey: null },
            ]}
            renderRow={(submission, index) => {
              const avgTime = calculateAverageTime(submission.time).toFixed(2);
              const avgMemory = calculateAverageMemory(submission.memory).toFixed(0);

              return (
                <tr key={submission?.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <Link
                      to={`/submissions/${submission?.id}`}
                      className="text-secondary hover:underline"
                    >
                      {submission?.problem?.title}
                    </Link>
                  </td>
                  <td className="text-center">{formatDate(submission?.createdAt, true)}</td>
                  <td
                    className={`text-center ${
                      submission?.status === 'Accepted' ? 'text-success' : 'text-error'
                    }`}
                  >
                    {submission.status}
                  </td>
                  <td className="text-center capitalize">{submission.language.toLowerCase()}</td>
                  <td className="text-center">
                    {avgTime} ms {'|'} {avgMemory} KB
                  </td>
                </tr>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SubmissionsSet;

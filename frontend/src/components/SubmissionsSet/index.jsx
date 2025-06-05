import { Link } from 'react-router-dom';
import { BookOpen, Home } from 'lucide-react';
import { useGetAllSubmissions } from '../../hooks/reactQuery/useSubmissionApi';
import toast from 'react-hot-toast';
import { MyLoader } from '../common';
import { calculateAverageMemory, calculateAverageTime } from '../../utils/calculation';
import formatDate from '../../utils/formatDate';

const SubmissionsSet = () => {
  const { data, isLoading, isError, error } = useGetAllSubmissions();

  if (isLoading) {
    return <MyLoader />;
  }

  if (isError) {
    toast.error(error?.error || 'Something went wrong');
  }

  // console.log('Submission data', data);

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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-sm">
              <thead>
                <tr className="text-base-content/70 font-semibold text-center">
                  <th>#</th>
                  <th>Question</th>
                  <th>Submitted On</th>
                  <th>Status</th>
                  <th>Language</th>
                  <th> Average Time & Memory</th>
                </tr>
              </thead>
              <tbody>
                {data.data?.length > 0 ? (
                  data.data?.map((submission, index) => {
                    // console.log();
                    // console.log();
                    const avgTime = calculateAverageTime(submission.time).toFixed(2);
                    const avgMemory = calculateAverageMemory(submission.memory).toFixed(0);

                    // console.log(`Average time: ${avgTime} ms & Average memory: ${avgMemory} KB`);
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
                        <td className="text-center capitalize">
                          {submission.language.toLowerCase()}
                        </td>
                        <td className="text-center">
                          {avgTime} ms {'|'} {avgMemory} KB
                        </td>
                      </tr>
                    );
                  })
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

export default SubmissionsSet;

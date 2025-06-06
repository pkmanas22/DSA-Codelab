import { Link, useParams } from 'react-router-dom';
import { useGetSubmissionByProblemId } from '../../hooks/reactQuery/useSubmissionApi';
import toast from 'react-hot-toast';
import { MyLoader } from '../common';
import timeAgo from '../../utils/timeAgo';

const SubmissionHistory = () => {
  const { problemId } = useParams();

  const { data, isError, error } = useGetSubmissionByProblemId(problemId);

  if (isError) {
    toast.error(error?.error || 'Something went wrong');
  }
  return (
    <table className="table w-full">
      <thead>
        <tr className="font-semibold text-center">
          <th>#</th>
          <th>Status</th>
          <th>Submission Time</th>
          <th>Language</th>
        </tr>
      </thead>

      <tbody className="text-center">
        {data?.data?.length > 0 ? (
          [...data.data]?.reverse()?.map((submission, index) => (
            <tr className="hover:bg-base-200" key={submission?.id}>
              <td>{index + 1}</td>
              <td>
                <Link
                  to={`/submissions/${submission?.id}`}
                  className={`underline ${
                    submission?.status === 'Accepted' ? 'text-success' : 'text-error'
                  }`}
                >
                  {submission.status}
                </Link>
              </td>
              <td>{timeAgo(submission?.createdAt, true)}</td>
              <td className="capitalize">{submission.language?.toLowerCase()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>No submissions to this problem</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SubmissionHistory;

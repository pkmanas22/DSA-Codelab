import React from 'react';
import formatDate from '../../utils/formatDate';
import { Link } from 'react-router-dom';

const SubmissionHistory = ({ submissionsHistory }) => {
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
        {submissionsHistory?.map((submission, index) => (
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
            <td>{formatDate(submission?.createdAt, true)}</td>
            <td className="capitalize">{submission.language.toLowerCase()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionHistory;

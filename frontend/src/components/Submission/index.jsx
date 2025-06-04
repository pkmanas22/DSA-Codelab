import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetSubmissionById } from '../../hooks/reactQuery/useSubmissionApi';
import { CopyButton, MyLoader, PageNotFound } from '../common';
import { Book } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import { calculateAverageMemory, calculateAverageTime } from '../../utils/calculation';

const Submission = () => {
  const { submissionId } = useParams();

  const { isLoading, isError, data, error } = useGetSubmissionById(submissionId);

  const { authUser } = useAuthStore();

  if (isLoading) {
    return <MyLoader />;
  }

  if (isError) {
    // toast.error(error.response.data?.error || 'Something went wrong');
    console.log(error);
    return <PageNotFound />;
  }

  // console.log(data.data);
  const avgTime = calculateAverageTime(data?.data?.time).toFixed(2);
  const avgMemory = calculateAverageMemory(data?.data?.memory).toFixed(0);

  const totalTestcases = data?.data?.testcasesResults?.length;
  const passedTestcases = data?.data?.testcasesResults?.filter((t) => t.isPassed).length;

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b">
            <h2 className="card-title text-2xl md:text-3xl flex items-center gap-3">
              <Book className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Submission Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pb-12">
            <div>
              <h3 className="font-semibold my-2 flex justify-between capitalize">
                {data.data?.language?.toLowerCase()}
                <span className="sticky top-0 right-0">
                  <CopyButton text={data.data?.sourceCode} />
                </span>
              </h3>
              <pre className="max-h-60  h-full text-xs bg-base-200 p-4 rounded-lg overflow-auto relative">
                {data.data?.sourceCode}
              </pre>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex gap-2 items-center text-2xl">
                  <span className="font-semibold ">Problem:</span>
                  <Link to={`/problems/${data.data?.problemId}`}>
                    <span className="text-primary hover:underline">
                      {data.data?.problem?.title}
                    </span>
                  </Link>
                </div>
                <div className="flex gap-2 items-center text-lg">
                  <span className="font-semibold">Language:</span>
                  <span>{data.data?.language?.toLowerCase()}</span>
                </div>
                <p>Submitted By : {authUser.name}</p>
                <p>
                  Submission Time :{' '}
                  {new Date(data.data.createdAt)
                    .toLocaleString('en-US', {
                      month: 'short', // "Jun"
                      day: '2-digit', // "04"
                      year: 'numeric', // "2025"
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false, // 24-hour format
                    })
                    .replace(',', '')}
                </p>
                <div
                  className={`badge ${
                    data.data?.status === 'Accepted' ? 'badge-success' : 'badge-error'
                  }`}
                >
                  {data.data?.status}
                </div>
                <p className="text-sm opacity-80">
                  {passedTestcases} / {totalTestcases} testcases passed
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-base-300 rounded-lg p-3">
                    <h4 className="text-center font-semibold">Average Time</h4>
                    <p className="text-center p-2 text-2xl text-white">{avgTime} ms</p>
                  </div>
                  <div className="border border-base-300 rounded-lg p-3">
                    <h4 className="text-center font-semibold">Average Memory</h4>
                    <p className="text-center p-2 text-2xl text-white">{avgMemory} KB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;

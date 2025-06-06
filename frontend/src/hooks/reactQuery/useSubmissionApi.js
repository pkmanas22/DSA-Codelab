import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../constants/keys';
import submissionApis from '../../apis/submissionApis';

export const useGetAllSubmissions = () =>
  useQuery({
    queryKey: QUERY_KEYS.SUBMISSIONS,
    queryFn: () => submissionApis.getAllSubmissions(),
  });

export const useGetSubmissionById = (id) =>
  useQuery({
    queryKey: [QUERY_KEYS.SUBMISSIONS, id],
    queryFn: () => submissionApis.getSubmissionById(id),
  });

export const useGetSubmissionByProblemId = (problemId) =>
  useQuery({
    queryKey: QUERY_KEYS.SUBMISSIONS_BY_PROBLEM_ID,
    queryFn: () => submissionApis.getAllSubmissionsByProblemId(problemId),
  });

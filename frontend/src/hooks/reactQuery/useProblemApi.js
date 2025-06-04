import { useMutation, useQuery } from 'react-query';
import { QUERY_KEYS } from '../../constants/keys';
import problemApis from '../../apis/problemApi';

export const useGetAllProblems = () =>
  useQuery({
    queryKey: QUERY_KEYS.ALL_PROBLEMS,
    queryFn: () => problemApis.getAllProblems(),
  });

export const useGetProblemById = (id) =>
  useQuery({
    queryKey: [QUERY_KEYS.PROBLEM, id],
    queryFn: () => problemApis.getProblemById(id),
  });

export const useRunProblem = () => useMutation(problemApis.runTheProblem);

export const useSubmitProblem = () => useMutation(problemApis.submitTheProblem);

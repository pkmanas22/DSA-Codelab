import { useMutation } from 'react-query';
import adminApis from '../../apis/adminApis';

export const useCreateProblem = () => useMutation(adminApis.createProblem);

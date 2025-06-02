import axios from 'axios';

const createProblem = (payload) => axios.post('/problem/create-problem', payload);

const adminApis = {
  createProblem,
};

export default adminApis;

import axios from 'axios';

const getAllProblems = () => axios.get('/problem/get-all-problems');

const getProblemById = (id) => axios.get(`/problem/get-problem/${id}`);

const problemApis = {
  getAllProblems,
  getProblemById,
};

export default problemApis;

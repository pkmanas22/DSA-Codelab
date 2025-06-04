import axios from 'axios';

const getAllSubmissions = () => axios.get('/submission/get-all-submissions');

const getSubmissionById = (id) => axios.get(`/submission/get-submission/${id}`);

const submissionApis = {
  getAllSubmissions,
  getSubmissionById,
};

export default submissionApis;

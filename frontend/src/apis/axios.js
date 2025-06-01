import axios from 'axios';

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    (res) => res.data,
    (error) => {
      if (axios.isAxiosError(error)) {
        // You can log or modify the error response here

        // You can even show a toast or trigger global logout if needed
        // e.g., if (status === 401) logoutUser();
        // return error.response.data;
        return Promise.reject(error.response.data);
      }

      // Non-Axios errors
      return Promise.reject(error);
    }
  );
};

const initializeAxios = () => {
  // console.log(import.meta.env.VITE_BACKEND_URL);
  axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/api/V1`;
  axios.defaults.withCredentials = true;
  setHttpHeaders();
  responseInterceptors();
};

export default initializeAxios;

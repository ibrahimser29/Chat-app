import axios from "axios";
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
  });
  axios.defaults.headers.common['Accept'] = 'application/json';
  export default api;
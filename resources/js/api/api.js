import axios from "axios";
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials:true,
    headers:{
      'Accept': 'application/json'
    }
  });
  let token = localStorage.getItem('token');
if(token != null ||token != undefined){
  api.defaults.headers.common = {'Authorization': `Bearer ${token}`}
}
  export default api;
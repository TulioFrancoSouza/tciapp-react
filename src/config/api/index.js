import axios from 'axios';

const ApiClient = axios.create({
  baseURL: "http://helpdesk.techniconnection.com:9000",
 //baseURL: "http://localhost:9000",
 //baseURL: "http://3.15.143.163:9000",
});

export { ApiClient };
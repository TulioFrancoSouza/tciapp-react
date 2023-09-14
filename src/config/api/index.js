import axios from 'axios';

const ApiClient = axios.create({
 // baseURL: "http://localhost:9000",
  baseURL: "https://helpdesk.techniconnection.com:9000",
});

export { ApiClient };
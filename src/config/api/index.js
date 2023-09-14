import axios from 'axios';

const ApiClient = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:9000",
  //baseURL: "http://18.118.37.172:9000",
=======
  //baseURL: "http://helpdesk.techniconnection.com:9000",
  baseURL: "http://localhost:9000",
 //baseURL: "http://3.15.143.163:9000",
>>>>>>> main
});

export { ApiClient };
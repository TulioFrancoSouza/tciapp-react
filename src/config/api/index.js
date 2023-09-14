import axios from 'axios';

const ApiClient = axios.create({
  baseURL: "http://localhost:9000",
  //baseURL: "http://18.118.37.172:9000",
});

export { ApiClient };
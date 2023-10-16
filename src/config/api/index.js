import axios from "axios";

const ApiClient = axios.create({
//baseURL: "http://localhost:9000",
 baseURL: "http://mtl.techniconnection.com:9000",
});

export { ApiClient };

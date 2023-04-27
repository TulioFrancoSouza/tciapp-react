import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtjgGxvdvWPQM6UEqYyFTDDQVBnMzUavw",
  authDomain: "techni-connection.firebaseapp.com",
  projectId: "techni-connection",
  storageBucket: "techni-connection.appspot.com",
  messagingSenderId: "99171557602",
  appId: "1:99171557602:web:7378e58fdef3cbf1dd7ebb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;

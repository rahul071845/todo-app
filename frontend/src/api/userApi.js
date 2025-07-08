import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.BACKEND_URL || "http://localhost:3000";

// Authentication APIs
export const signupUser = (userData) => axios.post("/user/signup", userData);
export const loginUser = (credentials) => axios.post("/user/login", credentials);
export const logoutUser = () => axios.get("/user/logout"); // correct it
export const checkAuthStatus = () => axios.get("/user/check"); // route for client session check

import axios from "axios";

// Base URL and credentials
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.BACKEND_URL || "http://localhost:3000";

// Task APIs
export const fetchTasks = () => axios.get("/tasks");
export const createTask = (task) => axios.post("/tasks", task);
export const deleteTask = (id) => axios.delete(`/tasks/${id}`);
export const completeTask = (id) => axios.put(`/tasks/${id}/complete`);
export const updateTask = (id, data) => axios.put(`/tasks/${id}`, data);

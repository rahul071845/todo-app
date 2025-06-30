import axios from "axios";

const API = "http://localhost:3000";

export const fetchTasks = () => axios.get(`${API}/tasks`);
export const createTask = (task) => axios.post(`${API}/tasks`, task);
export const deleteTask = (id) => axios.delete(`${API}/tasks/${id}`);
export const completeTask = (id) => axios.put(`${API}/tasks/${id}/complete`);
export const updateTask = (id, data) => axios.put(`${API}/tasks/${id}`, data);
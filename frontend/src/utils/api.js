import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const leaveAPI = {
  create: (data) => api.post('/leaves', data),
  getMyLeaves: () => api.get('/leaves/my-leaves'),
  getAllLeaves: () => api.get('/leaves/all'),
  getTeamLeaves: () => api.get('/leaves/team'),
  updateStatus: (id, data) => api.patch(`/leaves/${id}/status`, data),
  getStats: () => api.get('/leaves/stats')
};

export const userAPI = {
  getAll: () => api.get('/users'),
  update: (id, data) => api.patch(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`)
};

export default api;

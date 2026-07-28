import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export const projectsApi = {
  getAll: (params?: Record<string, string>) => api.get('/projects', { params }),
  getBySlug: (slug: string) => api.get(`/projects/${slug}`),
  getFeatured: () => api.get('/projects/featured'),
  create: (data: FormData) =>
    api.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) =>
    api.put(`/projects/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

export const servicesApi = {
  getAll: () => api.get('/services'),
  getBySlug: (slug: string) => api.get(`/services/${slug}`),
  create: (data: FormData) =>
    api.post('/services', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) =>
    api.put(`/services/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: string) => api.delete(`/services/${id}`),
};

export const testimonialsApi = {
  getAll: () => api.get('/testimonials'),
  getFeatured: () => api.get('/testimonials/featured'),
  create: (data: FormData) =>
    api.post('/testimonials', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) =>
    api.put(`/testimonials/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: string) => api.delete(`/testimonials/${id}`),
};

export const blogApi = {
  getAll: (params?: Record<string, string>) => api.get('/blog', { params }),
  getBySlug: (slug: string) => api.get(`/blog/${slug}`),
  create: (data: FormData) =>
    api.post('/blog', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) =>
    api.put(`/blog/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: string) => api.delete(`/blog/${id}`),
};

export const contactApi = {
  send: (data: { name: string; email: string; company?: string; budget?: string; message: string }) =>
    api.post('/contact', data),
  getAll: (params?: Record<string, string>) => api.get('/contact', { params }),
  markRead: (id: string) => api.put(`/contact/${id}/read`),
  delete: (id: string) => api.delete(`/contact/${id}`),
};

export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  verify: () => api.get('/auth/verify'),
};

export const homepageApi = {
  get: () => api.get('/homepage'),
  update: (data: Record<string, unknown>) => api.put('/homepage', data),
};

export const companyApi = {
  get: () => api.get('/company'),
  update: (data: FormData) =>
    api.put('/company', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

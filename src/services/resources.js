import api from './api'

export const UsersService = {
  login: (payload) => api.post('/users/login', payload),
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  register: (payload) => api.post('/users/register', payload),
  update: (id, payload) => api.put(`/users/${id}`, payload),
  remove: (id) => api.delete(`/users/${id}`),
}

export const StudentsService = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  create: (payload) => api.post('/students', payload),
  update: (id, payload) => api.put(`/students/${id}`, payload),
  remove: (id) => api.delete(`/students/${id}`),
}

export const ClassesService = {
  getAll: () => api.get('/classes'),
  getById: (id) => api.get(`/classes/${id}`),
  create: (payload) => api.post('/classes', payload),
  update: (id, payload) => api.put(`/classes/${id}`, payload),
  remove: (id) => api.delete(`/classes/${id}`),
}

export const EnrollmentsService = {
  getAll: () => api.get('/enrollments'),
  getById: (id) => api.get(`/enrollments/${id}`),
  create: (payload) => api.post('/enrollments', payload),
  update: (id, payload) => api.put(`/enrollments/${id}`, payload),
  remove: (id) => api.delete(`/enrollments/${id}`),
}

export const GradesService = {
  getAll: () => api.get('/grades'),
  getById: (id) => api.get(`/grades/${id}`),
  create: (payload) => api.post('/grades', payload),
  update: (id, payload) => api.put(`/grades/${id}`, payload),
  remove: (id) => api.delete(`/grades/${id}`),
}

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  USER_TYPE: '@user_type',
};

// User Types
export const USER_TYPES = {
  TEACHER: 'professor',
  STUDENT: 'aluno',
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',

  // Posts
  POSTS: '/posts',
  POST_BY_ID: (id) => `/posts/${id}`,
  POSTS_SEARCH: '/posts/search',

  // Professores
  TEACHERS: '/professores',
  TEACHER_BY_ID: (id) => `/professores/${id}`,

  // Alunos
  STUDENTS: '/alunos',
  STUDENT_BY_ID: (id) => `/alunos/${id}`,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
};

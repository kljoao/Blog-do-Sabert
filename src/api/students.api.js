import api from './axios.config';
import { API_ENDPOINTS, PAGINATION } from '../utils/constants';

export const studentsAPI = {
  /**
   * Obter todos os estudantes (com paginação)
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Object>}
   */
  getStudents: async (page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT) => {
    try {
      const response = await api.get(API_ENDPOINTS.STUDENTS, {
        params: { page, limit },
      });
      return {
        success: true,
        students: response.data.data || response.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar estudantes',
      };
    }
  },

  /**
   * Obter estudante por ID
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  getStudentById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.STUDENT_BY_ID(id));
      return {
        success: true,
        student: response.data.data || response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar estudante',
      };
    }
  },

  /**
   * Criar novo estudante
   * @param {Object} studentData - { name, email, enrollment, etc }
   * @returns {Promise<Object>}
   */
  createStudent: async (studentData) => {
    try {
      // API aceita apenas: nome, email, senha
      const payload = {
        nome: studentData.name || studentData.nome,
        email: studentData.email,
        senha: studentData.password || studentData.senha,
      };

      const response = await api.post(API_ENDPOINTS.STUDENTS, payload);
      return {
        success: true,
        student: response.data.data || response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao criar estudante',
      };
    }
  },

  /**
   * Atualizar estudante existente
   * @param {string|number} id
   * @param {Object} studentData
   * @returns {Promise<Object>}
   */
  updateStudent: async (id, studentData) => {
    try {
      // API aceita apenas: nome, email (senha é opcional na atualização)
      const payload = {
        nome: studentData.name || studentData.nome,
        email: studentData.email,
      };

      const response = await api.put(API_ENDPOINTS.STUDENT_BY_ID(id), payload);
      return {
        success: true,
        student: response.data.data || response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar estudante',
      };
    }
  },

  /**
   * Deletar estudante
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  deleteStudent: async (id) => {
    try {
      await api.delete(API_ENDPOINTS.STUDENT_BY_ID(id));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao deletar estudante',
      };
    }
  },
};

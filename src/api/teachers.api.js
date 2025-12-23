import api from './axios.config';
import { API_ENDPOINTS, PAGINATION } from '../utils/constants';

export const teachersAPI = {
  /**
   * Obter todos os professores (com paginação)
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Object>}
   */
  getTeachers: async (page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT) => {
    try {
      const response = await api.get(API_ENDPOINTS.TEACHERS, {
        params: { page, limit },
      });
      return {
        success: true,
        teachers: response.data.data || response.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar professores',
      };
    }
  },

  /**
   * Obter professor por ID
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  getTeacherById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.TEACHER_BY_ID(id));
      return {
        success: true,
        teacher: response.data.data || response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar professor',
      };
    }
  },

  /**
   * Criar novo professor
   * @param {Object} teacherData - { name, email, subject, etc }
   * @returns {Promise<Object>}
   */
  createTeacher: async (teacherData) => {
    try {
      // API aceita apenas: nome, email, senha
      const payload = {
        nome: teacherData.name || teacherData.nome,
        email: teacherData.email,
        senha: teacherData.password || teacherData.senha,
      };

      const response = await api.post(API_ENDPOINTS.TEACHERS, payload);
      return {
        success: true,
        teacher: response.data.data || response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao criar professor',
      };
    }
  },

  /**
   * Atualizar professor existente
   * @param {string|number} id
   * @param {Object} teacherData
   * @returns {Promise<Object>}
   */
  updateTeacher: async (id, teacherData) => {
    try {
      // API aceita apenas: nome, email (senha é opcional na atualização)
      const payload = {
        nome: teacherData.name || teacherData.nome,
        email: teacherData.email,
      };

      const response = await api.put(API_ENDPOINTS.TEACHER_BY_ID(id), payload);
      return {
        success: true,
        teacher: response.data.data || response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar professor',
      };
    }
  },

  /**
   * Deletar professor
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  deleteTeacher: async (id) => {
    try {
      await api.delete(API_ENDPOINTS.TEACHER_BY_ID(id));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao deletar professor',
      };
    }
  },
};

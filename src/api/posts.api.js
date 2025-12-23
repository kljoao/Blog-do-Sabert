import api from './axios.config';
import { API_ENDPOINTS } from '../utils/constants';

export const postsAPI = {
  /**
   * Obter todos os posts
   * @param {string} searchQuery - Query de busca (opcional)
   * @returns {Promise<Object>}
   */
  getPosts: async (searchQuery = '') => {
    try {
      let url = API_ENDPOINTS.POSTS;
      let params = {};

      // Se houver busca, usar endpoint /posts/search?q=termo
      if (searchQuery) {
        url = API_ENDPOINTS.POSTS_SEARCH;
        params = { q: searchQuery };
      }

      const response = await api.get(url, { params });
      return {
        success: true,
        posts: response.data.data || response.data, // API retorna apenas data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar posts',
      };
    }
  },

  /**
   * Obter post por ID
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  getPostById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.POST_BY_ID(id));
      return {
        success: true,
        post: response.data.data || response.data, // API retorna apenas data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar post',
      };
    }
  },

  /**
   * Criar novo post
   * @param {Object} postData - { title, content, author }
   * @returns {Promise<Object>}
   */
  createPost: async (postData) => {
    try {
      // Ajustar para campos em português
      const payload = {
        titulo: postData.title || postData.titulo,
        conteudo: postData.content || postData.conteudo,
        autor: postData.author || postData.autor,
      };

      const response = await api.post(API_ENDPOINTS.POSTS, payload);
      return {
        success: true,
        post: response.data.data || response.data, // API retorna apenas data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao criar post',
      };
    }
  },

  /**
   * Atualizar post existente
   * @param {string|number} id
   * @param {Object} postData
   * @returns {Promise<Object>}
   */
  updatePost: async (id, postData) => {
    try {
      // Ajustar para campos em português
      const payload = {
        titulo: postData.title || postData.titulo,
        conteudo: postData.content || postData.conteudo,
        autor: postData.author || postData.autor,
      };

      const response = await api.put(API_ENDPOINTS.POST_BY_ID(id), payload);
      return {
        success: true,
        post: response.data.data || response.data, // API retorna apenas data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar post',
      };
    }
  },

  /**
   * Deletar post
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  deletePost: async (id) => {
    try {
      await api.delete(API_ENDPOINTS.POST_BY_ID(id));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao deletar post',
      };
    }
  },

  /**
   * Comentar em um post (opcional)
   * @param {string|number} postId
   * @param {Object} comment - { text, author }
   * @returns {Promise<Object>}
   */
  commentOnPost: async (postId, comment) => {
    try {
      const response = await api.post(`${API_ENDPOINTS.POST_BY_ID(postId)}/comments`, comment);
      return {
        success: true,
        comment: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao comentar',
      };
    }
  },
};

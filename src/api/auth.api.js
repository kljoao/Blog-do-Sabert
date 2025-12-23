import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axios.config';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';

export const authAPI = {
  /**
   * Login do usuário
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} - { token, user, userType }
   */
  login: async (credentials) => {
    try {
      // Ajustar para campos em português
      const payload = {
        email: credentials.email,
        senha: credentials.password || credentials.senha,
      };

      const response = await api.post(API_ENDPOINTS.LOGIN, payload);
      const { token, user } = response.data.data || response.data; // Suporta ambos os formatos

      // DEBUG: Verificar dados recebidos
      console.log('=== DEBUG LOGIN ===');
      console.log('Response completo:', JSON.stringify(response.data, null, 2));
      console.log('User recebido:', JSON.stringify(user, null, 2));
      console.log('user.tipo:', user.tipo);
      console.log('==================');

      // Salvar token e dados do usuário
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

      // Determinar tipo de usuário
      const userType = user.tipo || 'aluno';
      console.log('userType definido como:', userType);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_TYPE, userType);

      return {
        success: true,
        token,
        user,
        userType,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao fazer login',
      };
    }
  },

  /**
   * Registro de novo usuário
   * @param {Object} userData - { name, email, password, type }
   * @returns {Promise<Object>}
   */
  register: async (userData) => {
    try {
      // Ajustar para campos em português
      const payload = {
        nome: userData.name || userData.nome,
        email: userData.email,
        senha: userData.password || userData.senha,
      };

      const response = await api.post(API_ENDPOINTS.REGISTER, payload);
      return {
        success: true,
        data: response.data.data || response.data, // Suporta ambos os formatos
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao registrar usuário',
      };
    }
  },

  /**
   * Obter dados do usuário atual
   * @returns {Promise<Object>}
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ME);
      return {
        success: true,
        user: response.data.data || response.data, // Suporta ambos os formatos
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao obter usuário',
      };
    }
  },

  /**
   * Logout do usuário
   */
  logout: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_TYPE);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao fazer logout',
      };
    }
  },
};

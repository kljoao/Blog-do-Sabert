import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL da API
const API_BASE_URL = 'http://localhost:3000';

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição - adiciona token de autenticação
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao obter token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta - trata erros globalmente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      // Erros HTTP (401, 403, 404, 500, etc)
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Token inválido ou expirado - fazer logout
          await AsyncStorage.removeItem('@auth_token');
          await AsyncStorage.removeItem('@user_data');
          // Você pode despachar uma action para resetar o estado aqui
          console.error('Não autorizado - faça login novamente');
          break;

        case 403:
          console.error('Acesso negado - você não tem permissão');
          break;

        case 404:
          console.error('Recurso não encontrado');
          break;

        case 500:
          console.error('Erro interno do servidor');
          break;

        default:
          console.error('Erro na requisição:', data?.message || 'Erro desconhecido');
      }
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      console.error('Erro de conexão - verifique sua internet');
    } else {
      // Erro ao configurar a requisição
      console.error('Erro:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;

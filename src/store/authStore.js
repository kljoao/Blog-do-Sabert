import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,
  userType: null, // 'professor' | 'aluno'
  loading: false,
  error: null,

  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setToken: async (token) => {
    if (token) {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } else {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
    set({ token, isAuthenticated: !!token });
  },

  setUserType: async (userType) => {
    if (userType) {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_TYPE, userType);
    } else {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_TYPE);
    }
    set({ userType });
  },

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      // Esta função será chamada pelos serviços de API
      // Aqui apenas atualizamos o estado
      return true;
    } catch (error) {
      set({ error: error.message });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_TYPE);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        userType: null,
        error: null,
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      const userType = await AsyncStorage.getItem(STORAGE_KEYS.USER_TYPE);

      if (token && userData) {
        set({
          token,
          user: JSON.parse(userData),
          userType,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      set({ isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

export default useAuthStore;

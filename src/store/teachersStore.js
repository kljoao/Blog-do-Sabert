import { create } from 'zustand';

const useTeachersStore = create((set, get) => ({
  // State
  teachers: [],
  currentTeacher: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  },

  // Actions
  setTeachers: (teachers) => set({ teachers }),

  setCurrentTeacher: (teacher) => set({ currentTeacher: teacher }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setPagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),

  addTeacher: (teacher) => {
    const { teachers } = get();
    set({ teachers: [teacher, ...teachers] });
  },

  updateTeacher: (id, updatedTeacher) => {
    const { teachers } = get();
    set({
      teachers: teachers.map((teacher) =>
        teacher.id === id ? { ...teacher, ...updatedTeacher } : teacher
      ),
    });
  },

  deleteTeacher: (id) => {
    const { teachers } = get();
    set({ teachers: teachers.filter((teacher) => teacher.id !== id) });
  },

  clearCurrentTeacher: () => set({ currentTeacher: null }),

  clearError: () => set({ error: null }),

  resetStore: () =>
    set({
      teachers: [],
      currentTeacher: null,
      loading: false,
      error: null,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 10,
      },
    }),
}));

export default useTeachersStore;

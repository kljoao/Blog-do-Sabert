import { create } from 'zustand';

const useStudentsStore = create((set, get) => ({
  // State
  students: [],
  currentStudent: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  },

  // Actions
  setStudents: (students) => set({ students }),

  setCurrentStudent: (student) => set({ currentStudent: student }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setPagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),

  addStudent: (student) => {
    const { students } = get();
    set({ students: [student, ...students] });
  },

  updateStudent: (id, updatedStudent) => {
    const { students } = get();
    set({
      students: students.map((student) =>
        student.id === id ? { ...student, ...updatedStudent } : student
      ),
    });
  },

  deleteStudent: (id) => {
    const { students } = get();
    set({ students: students.filter((student) => student.id !== id) });
  },

  clearCurrentStudent: () => set({ currentStudent: null }),

  clearError: () => set({ error: null }),

  resetStore: () =>
    set({
      students: [],
      currentStudent: null,
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

export default useStudentsStore;

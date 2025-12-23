import { create } from 'zustand';

const usePostsStore = create((set, get) => ({
  // State
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  searchQuery: '',

  // Actions
  setPosts: (posts) => set({ posts }),

  setCurrentPost: (post) => set({ currentPost: post }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  addPost: (post) => {
    const { posts } = get();
    set({ posts: [post, ...posts] });
  },

  updatePost: (id, updatedPost) => {
    const { posts } = get();
    set({
      posts: posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post)),
    });
  },

  deletePost: (id) => {
    const { posts } = get();
    set({ posts: posts.filter((post) => post.id !== id) });
  },

  clearCurrentPost: () => set({ currentPost: null }),

  clearError: () => set({ error: null }),

  resetStore: () =>
    set({
      posts: [],
      currentPost: null,
      loading: false,
      error: null,
      searchQuery: '',
    }),
}));

export default usePostsStore;

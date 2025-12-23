import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostCard from '../../components/PostCard';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';
import { theme } from '../../styles/theme';
import usePostsStore from '../../store/postsStore';
import { postsAPI } from '../../api/posts.api';

const PostListScreen = ({ navigation }) => {
  const { posts, searchQuery, setPosts, setSearchQuery, setLoading, loading } = usePostsStore();
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async (query = '') => {
    setLoading(true);
    const result = await postsAPI.getPosts(query);
    if (result.success) {
      setPosts(result.posts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchPosts(query);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts(searchQuery);
    setRefreshing(false);
  };

  const handlePostPress = (post) => {
    navigation.navigate('PostDetail', { postId: post.id });
  };

  if (loading && posts.length === 0) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Buscar posts..."
        />

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <PostCard post={item} onPress={() => handlePostPress(item)} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum post encontrado</Text>
            </View>
          }
          contentContainerStyle={posts.length === 0 && styles.emptyList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.textSecondary,
  },
});

export default PostListScreen;

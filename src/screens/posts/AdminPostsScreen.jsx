import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../../components/Loading';
import { theme } from '../../styles/theme';
import usePostsStore from '../../store/postsStore';
import { postsAPI } from '../../api/posts.api';

const AdminPostsScreen = ({ navigation }) => {
  const { posts, setPosts, deletePost: deletePostFromStore, setLoading, loading } =
    usePostsStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const result = await postsAPI.getPosts();
    if (result.success) {
      setPosts(result.posts);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const handleEdit = (post) => {
    navigation.navigate('EditPost', { post });
  };

  const handleDelete = (post) => {
    Alert.alert('Confirmar', `Deseja realmente excluir "${post.titulo}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const result = await postsAPI.deletePost(post.id);
          if (result.success) {
            deletePostFromStore(post.id);
            Alert.alert('Sucesso', 'Post excluído com sucesso');
          } else {
            Alert.alert('Erro', result.error);
          }
        },
      },
    ]);
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postInfo}>
        <Text style={styles.postTitle} numberOfLines={1}>
          {item.titulo}
        </Text>
        <Text style={styles.postAuthor}>Por: {item.autor}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
          <Ionicons name="create-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={24} color={theme.colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && posts.length === 0) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderPost}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum post encontrado</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    padding: theme.spacing.md,
  },
  postCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
    alignItems: 'center',
  },
  postInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  postTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  postAuthor: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    padding: theme.spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.textSecondary,
  },
});

export default AdminPostsScreen;

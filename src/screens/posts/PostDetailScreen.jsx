import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import { theme } from '../../styles/theme';
import { postsAPI } from '../../api/posts.api';
import useAuthStore from '../../store/authStore';
import usePostsStore from '../../store/postsStore';

const PostDetailScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userType } = useAuthStore();
  const { deletePost: deletePostFromStore } = usePostsStore();

  const isTeacher = userType === 'professor';

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    setLoading(true);
    const result = await postsAPI.getPostById(postId);
    if (result.success) {
      setPost(result.post);
    } else {
      Alert.alert('Erro', result.error);
      navigation.goBack();
    }
    setLoading(false);
  };

  const handleEdit = () => {
    navigation.navigate('EditPost', { post });
  };

  const handleDelete = () => {
    Alert.alert('Confirmar', 'Deseja realmente excluir este post?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const result = await postsAPI.deletePost(postId);
          if (result.success) {
            deletePostFromStore(postId);
            navigation.goBack();
          } else {
            Alert.alert('Erro', result.error);
          }
        },
      },
    ]);
  };

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Post não encontrado</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>{post.titulo}</Text>
          <Text style={styles.author}>Por: {post.autor}</Text>
          {post.data_criacao && (
            <Text style={styles.date}>
              {new Date(post.data_criacao).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          )}

          <View style={styles.divider} />

          <Text style={styles.contentText}>{post.conteudo}</Text>

          {isTeacher && (
            <View style={styles.actions}>
              <Button title="Editar" onPress={handleEdit} style={styles.editButton} />
              <Button
                title="Excluir"
                onPress={handleDelete}
                variant="danger"
                style={styles.deleteButton}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fonts.sizes.xxl,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  author: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  date: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing.lg,
  },
  contentText: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.text,
    lineHeight: 24,
  },
  actions: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  editButton: {
    marginBottom: theme.spacing.sm,
  },
  deleteButton: {},
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorText: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.textSecondary,
  },
});

export default PostDetailScreen;

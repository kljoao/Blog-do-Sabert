import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { theme } from '../../styles/theme';
import { postsAPI } from '../../api/posts.api';
import usePostsStore from '../../store/postsStore';
import useAuthStore from '../../store/authStore';
import { validatePostForm } from '../../utils/validators';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { addPost } = usePostsStore();
  const { user } = useAuthStore();

  const handleSubmit = async () => {
    // Validar formulário
    const validation = validatePostForm(title, content, author || user?.name);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const postData = {
        title,
        content,
        author: author || user?.nome || user?.name || 'Anônimo',
      };

      const result = await postsAPI.createPost(postData);

      if (result.success) {
        addPost(result.post);
        Alert.alert('Sucesso', 'Post criado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Erro', result.error);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar o post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <Input
              label="Título"
              value={title}
              onChangeText={setTitle}
              placeholder="Digite o título do post"
              error={errors.title}
            />

            <Input
              label="Autor"
              value={author}
              onChangeText={setAuthor}
              placeholder={user?.nome || user?.name || 'Seu nome'}
              error={errors.author}
            />

            <Input
              label="Conteúdo"
              value={content}
              onChangeText={setContent}
              placeholder="Digite o conteúdo do post"
              multiline
              numberOfLines={10}
              error={errors.content}
            />

            <Button title="Criar Post" onPress={handleSubmit} loading={loading} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing.xl,
  },
});

export default CreatePostScreen;

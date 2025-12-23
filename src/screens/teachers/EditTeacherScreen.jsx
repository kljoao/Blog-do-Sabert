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
import { teachersAPI } from '../../api/teachers.api';
import useTeachersStore from '../../store/teachersStore';
import { validateRequired, validateEmail } from '../../utils/validators';

const EditTeacherScreen = ({ route, navigation }) => {
  const { teacher } = route.params;

  const [name, setName] = useState(teacher.nome || '');
  const [email, setEmail] = useState(teacher.email || '');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { updateTeacher } = useTeachersStore();

  const handleSubmit = async () => {
    // Validar formulário - API aceita apenas nome, email
    const nameError = validateRequired(name, 'Nome');
    const emailError = validateEmail(email);

    if (nameError || emailError) {
      setErrors({
        name: nameError,
        email: emailError,
      });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const teacherData = {
        name,
        email,
      };

      const result = await teachersAPI.updateTeacher(teacher.id, teacherData);

      if (result.success) {
        updateTeacher(teacher.id, result.teacher);
        Alert.alert('Sucesso', 'Professor atualizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Erro', result.error);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o professor');
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
              label="Nome *"
              value={name}
              onChangeText={setName}
              placeholder="Nome completo"
              error={errors.name}
            />

            <Input
              label="Email *"
              value={email}
              onChangeText={setEmail}
              placeholder="email@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Button title="Salvar Alterações" onPress={handleSubmit} loading={loading} />
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

export default EditTeacherScreen;

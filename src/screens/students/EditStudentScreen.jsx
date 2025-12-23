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
import { studentsAPI } from '../../api/students.api';
import useStudentsStore from '../../store/studentsStore';
import { validateRequired, validateEmail } from '../../utils/validators';

const EditStudentScreen = ({ route, navigation }) => {
  const { student } = route.params;

  const [name, setName] = useState(student.nome || '');
  const [email, setEmail] = useState(student.email || '');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { updateStudent } = useStudentsStore();

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
      const studentData = {
        name,
        email,
      };

      const result = await studentsAPI.updateStudent(student.id, studentData);

      if (result.success) {
        updateStudent(student.id, result.student);
        Alert.alert('Sucesso', 'Estudante atualizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Erro', result.error);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o estudante');
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

export default EditStudentScreen;

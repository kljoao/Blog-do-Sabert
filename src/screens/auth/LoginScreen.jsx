import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { theme } from '../../styles/theme';
import { authAPI } from '../../api/auth.api';
import useAuthStore from '../../store/authStore';
import { validateLoginForm } from '../../utils/validators';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { setUser, setToken, setUserType } = useAuthStore();

  const handleLogin = async () => {
    const validation = validateLoginForm(email, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const result = await authAPI.login({ email, password });

      if (result.success) {
        setUser(result.user);
        setToken(result.token);
        setUserType(result.userType);
      } else {
        Alert.alert('Erro', result.error);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[theme.colors.primary, theme.colors.primaryDark]} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../../../public/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.welcomeText}>Bem-vindo ao</Text>
                <Text style={styles.appName}>Blog do Saber</Text>
                <Text style={styles.tagline}>Conhecimento que transforma</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Entrar na Plataforma</Text>

                <View style={styles.form}>
                  <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email}
                    icon="mail-outline"
                  />

                  <Input
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    secureTextEntry
                    error={errors.password}
                    icon="lock-closed-outline"
                  />

                  <Button
                    title="Entrar"
                    onPress={handleLogin}
                    loading={loading}
                    style={styles.button}
                  />
                </View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>FIAP - Tech Challenge 2025</Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoContainer: {
    width: 180,
    height: 180,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.regular,
    color: theme.colors.textOnPrimary,
    opacity: 0.9,
    marginBottom: theme.spacing.xs,
  },
  appName: {
    fontSize: theme.fonts.sizes.xxxl,
    fontWeight: theme.fonts.weights.extrabold,
    color: theme.colors.textOnPrimary,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.regular,
    color: theme.colors.textOnPrimary,
    opacity: 0.8,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    ...theme.shadows.xl,
  },
  cardTitle: {
    fontSize: theme.fonts.sizes.xl,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  form: {
    gap: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.md,
  },
  footer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textOnPrimary,
    opacity: 0.7,
  },
});

export default LoginScreen;

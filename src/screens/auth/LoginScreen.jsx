import React, { useState } from 'react';
import {
  View,
  Text,
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
    <View className="flex-1">
      <LinearGradient
        colors={['#2E7D32', '#1B5E20']}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 32 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Header com Logo */}
              <View className="items-center mb-xl">
                <View className="w-[180px] h-[180px] bg-surface rounded-2xl p-md mb-lg shadow-lg">
                  <Image
                    source={require('../../../public/logo.png')}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-lg font-normal text-text-on-primary opacity-90 mb-xs">
                  Bem-vindo ao
                </Text>
                <Text className="text-3xl font-extrabold text-text-on-primary mb-xs">
                  Blog do Saber
                </Text>
                <Text className="text-md font-normal text-text-on-primary opacity-80">
                  Conhecimento que transforma
                </Text>
              </View>

              {/* Card de Login */}
              <View className="bg-surface rounded-xl p-xl shadow-xl">
                <Text className="text-xl font-bold text-text mb-lg text-center">
                  Entrar na Plataforma
                </Text>

                <View className="gap-md">
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
                    className="mt-md"
                  />
                </View>
              </View>

              {/* Footer */}
              <View className="mt-xl items-center">
                <Text className="text-sm text-text-on-primary opacity-70">
                  FIAP - Tech Challenge 2025
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;

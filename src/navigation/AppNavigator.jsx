import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../styles/theme';
import useAuthStore from '../store/authStore';
import AuthNavigator from './AuthNavigator';
import Loading from '../components/Loading';

// Import screens - placeholders
import PostListScreen from '../screens/posts/PostListScreen';
import PostDetailScreen from '../screens/posts/PostDetailScreen';
import CreatePostScreen from '../screens/posts/CreatePostScreen';
import EditPostScreen from '../screens/posts/EditPostScreen';
import AdminNavigator from './AdminNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack de Posts
const PostsStack = () => {
  const { userType } = useAuthStore();
  const isTeacher = userType === 'professor';

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: theme.fonts.weights.semibold,
        },
      }}
    >
      <Stack.Screen
        name="PostList"
        component={PostListScreen}
        options={({ navigation }) => ({
          title: 'Posts',
          headerRight: () =>
            isTeacher ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('CreatePost')}
                style={{ marginRight: 16 }}
              >
                <Ionicons name="add" size={28} color={theme.colors.primary} />
              </TouchableOpacity>
            ) : null,
        })}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ title: 'Detalhes do Post' }}
      />
      {isTeacher && (
        <>
          <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{ title: 'Novo Post' }}
          />
          <Stack.Screen
            name="EditPost"
            component={EditPostScreen}
            options={{ title: 'Editar Post' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

// Tela de perfil simples
const ProfileScreen = () => {
  const { user, userType, logout } = useAuthStore();
  const [debugInfo, setDebugInfo] = React.useState('');

  const showDebugInfo = async () => {
    const token = await AsyncStorage.getItem('@auth_token');
    const userData = await AsyncStorage.getItem('@user_data');
    const storedUserType = await AsyncStorage.getItem('@user_type');

    const info = `
=== DEBUG INFO ===
User do state: ${JSON.stringify(user, null, 2)}
UserType do state: ${userType}
Token no storage: ${token ? 'Existe' : 'Não existe'}
User no storage: ${userData}
UserType no storage: ${storedUserType}
==================
    `;
    console.log(info);
    setDebugInfo(info);
  };

  const clearCacheAndLogout = async () => {
    await AsyncStorage.clear(); // Limpa TUDO
    console.log('AsyncStorage limpo completamente!');
    await logout();
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: theme.colors.background }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Perfil</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Nome: {user?.nome || user?.name || 'Usuário'}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Email: {user?.email || '-'}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Tipo (state): {userType}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20, color: theme.colors.primary, fontWeight: 'bold' }}>
        Exibição: {userType === 'professor' ? 'Professor' : 'Estudante'}
      </Text>

      <TouchableOpacity
        onPress={showDebugInfo}
        style={{
          backgroundColor: theme.colors.primary,
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Mostrar Debug Info</Text>
      </TouchableOpacity>

      {debugInfo ? (
        <Text style={{ fontSize: 10, marginBottom: 10, fontFamily: 'monospace' }}>
          {debugInfo}
        </Text>
      ) : null}

      <TouchableOpacity
        onPress={clearCacheAndLogout}
        style={{
          backgroundColor: '#FF6B00',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Limpar Cache + Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: theme.colors.danger,
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

// Tabs principais
const MainTabs = () => {
  const { userType } = useAuthStore();
  const isTeacher = userType === 'professor';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'PostsTab') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'AdminTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textLight,
      })}
    >
      <Tab.Screen name="PostsTab" component={PostsStack} options={{ title: 'Posts' }} />
      {isTeacher && (
        <Tab.Screen name="AdminTab" component={AdminNavigator} options={{ title: 'Admin' }} />
      )}
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};

// Navegador principal
const AppNavigator = () => {
  const { isAuthenticated, checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return isAuthenticated ? <MainTabs /> : <AuthNavigator />;
};

export default AppNavigator;

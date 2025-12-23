import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

// Placeholder screens - serão criadas depois
import AdminPostsScreen from '../screens/posts/AdminPostsScreen';
import TeacherListScreen from '../screens/teachers/TeacherListScreen';
import CreateTeacherScreen from '../screens/teachers/CreateTeacherScreen';
import EditTeacherScreen from '../screens/teachers/EditTeacherScreen';
import StudentListScreen from '../screens/students/StudentListScreen';
import CreateStudentScreen from '../screens/students/CreateStudentScreen';
import EditStudentScreen from '../screens/students/EditStudentScreen';

const Stack = createStackNavigator();

const AdminNavigator = () => {
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
        name="AdminPosts"
        component={AdminPostsScreen}
        options={{ title: 'Gerenciar Posts' }}
      />
      <Stack.Screen
        name="TeacherList"
        component={TeacherListScreen}
        options={({ navigation }) => ({
          title: 'Professores',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateTeacher')}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="add" size={28} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CreateTeacher"
        component={CreateTeacherScreen}
        options={{ title: 'Novo Professor' }}
      />
      <Stack.Screen
        name="EditTeacher"
        component={EditTeacherScreen}
        options={{ title: 'Editar Professor' }}
      />
      <Stack.Screen
        name="StudentList"
        component={StudentListScreen}
        options={({ navigation }) => ({
          title: 'Estudantes',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateStudent')}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="add" size={28} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CreateStudent"
        component={CreateStudentScreen}
        options={{ title: 'Novo Estudante' }}
      />
      <Stack.Screen
        name="EditStudent"
        component={EditStudentScreen}
        options={{ title: 'Editar Estudante' }}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;

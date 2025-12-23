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
import useStudentsStore from '../../store/studentsStore';
import { studentsAPI } from '../../api/students.api';

const StudentListScreen = ({ navigation }) => {
  const {
    students,
    pagination,
    setStudents,
    setPagination,
    deleteStudent: deleteStudentFromStore,
    setLoading,
    loading,
  } = useStudentsStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (page = 1) => {
    setLoading(true);
    const result = await studentsAPI.getStudents(page);
    if (result.success) {
      setStudents(result.students);
      if (result.pagination) {
        setPagination(result.pagination);
      }
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStudents(1);
    setRefreshing(false);
  };

  const handleEdit = (student) => {
    navigation.navigate('EditStudent', { student });
  };

  const handleDelete = (student) => {
    Alert.alert('Confirmar', `Deseja realmente excluir "${student.nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const result = await studentsAPI.deleteStudent(student.id);
          if (result.success) {
            deleteStudentFromStore(student.id);
            Alert.alert('Sucesso', 'Estudante excluído com sucesso');
          } else {
            Alert.alert('Erro', result.error);
          }
        },
      },
    ]);
  };

  const handleLoadMore = () => {
    if (pagination.currentPage < pagination.totalPages && !loading) {
      fetchStudents(pagination.currentPage + 1);
    }
  };

  const renderStudent = ({ item }) => (
    <View style={styles.studentCard}>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.nome}</Text>
        <Text style={styles.studentEmail}>{item.email}</Text>
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

  if (loading && students.length === 0) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderStudent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum estudante encontrado</Text>
          </View>
        }
        ListFooterComponent={
          loading && students.length > 0 ? (
            <View style={styles.loadingFooter}>
              <Loading size="small" />
            </View>
          ) : null
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
  studentCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
    alignItems: 'center',
  },
  studentInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  studentName: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  studentEmail: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  studentEnrollment: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textLight,
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
  loadingFooter: {
    paddingVertical: theme.spacing.md,
  },
});

export default StudentListScreen;

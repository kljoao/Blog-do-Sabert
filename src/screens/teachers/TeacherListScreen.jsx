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
import Button from '../../components/Button';
import { theme } from '../../styles/theme';
import useTeachersStore from '../../store/teachersStore';
import { teachersAPI } from '../../api/teachers.api';

const TeacherListScreen = ({ navigation }) => {
  const {
    teachers,
    pagination,
    setTeachers,
    setPagination,
    deleteTeacher: deleteTeacherFromStore,
    setLoading,
    loading,
  } = useTeachersStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async (page = 1) => {
    setLoading(true);
    const result = await teachersAPI.getTeachers(page);
    if (result.success) {
      setTeachers(result.teachers);
      if (result.pagination) {
        setPagination(result.pagination);
      }
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTeachers(1);
    setRefreshing(false);
  };

  const handleEdit = (teacher) => {
    navigation.navigate('EditTeacher', { teacher });
  };

  const handleDelete = (teacher) => {
    Alert.alert('Confirmar', `Deseja realmente excluir "${teacher.nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const result = await teachersAPI.deleteTeacher(teacher.id);
          if (result.success) {
            deleteTeacherFromStore(teacher.id);
            Alert.alert('Sucesso', 'Professor excluído com sucesso');
          } else {
            Alert.alert('Erro', result.error);
          }
        },
      },
    ]);
  };

  const handleLoadMore = () => {
    if (pagination.currentPage < pagination.totalPages && !loading) {
      fetchTeachers(pagination.currentPage + 1);
    }
  };

  const renderTeacher = ({ item }) => (
    <View style={styles.teacherCard}>
      <View style={styles.teacherInfo}>
        <Text style={styles.teacherName}>{item.nome}</Text>
        <Text style={styles.teacherEmail}>{item.email}</Text>
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

  if (loading && teachers.length === 0) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={teachers}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderTeacher}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum professor encontrado</Text>
          </View>
        }
        ListFooterComponent={
          loading && teachers.length > 0 ? (
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
  teacherCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
    alignItems: 'center',
  },
  teacherInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  teacherName: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  teacherEmail: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  teacherSubject: {
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

export default TeacherListScreen;

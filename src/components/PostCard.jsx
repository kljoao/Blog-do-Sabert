import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

const PostCard = ({ post, onPress }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.header}>
        <View style={styles.categoryBadge}>
          <Ionicons name="newspaper-outline" size={16} color={theme.colors.primary} />
          <Text style={styles.categoryText}>Artigo</Text>
        </View>
        {post.data_criacao && (
          <Text style={styles.dateText}>{formatDate(post.data_criacao)}</Text>
        )}
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {post.titulo || 'Sem título'}
      </Text>

      {post.conteudo && (
        <Text style={styles.content} numberOfLines={3}>
          {post.conteudo}
        </Text>
      )}

      <View style={styles.footer}>
        <View style={styles.authorContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={16} color={theme.colors.textOnPrimary} />
          </View>
          <Text style={styles.authorText}>{post.autor || 'Autor desconhecido'}</Text>
        </View>
        <View style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Ler mais</Text>
          <Ionicons name="arrow-forward" size={14} color={theme.colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.secondary,
    ...theme.shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    gap: theme.spacing.xs,
  },
  categoryText: {
    fontSize: theme.fonts.sizes.xs,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: theme.fonts.sizes.xs,
    color: theme.colors.textLight,
    fontWeight: theme.fonts.weights.medium,
  },
  title: {
    fontSize: theme.fonts.sizes.xl,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    lineHeight: 26,
    marginBottom: theme.spacing.sm,
  },
  content: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  authorText: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  readMoreText: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.primary,
    marginRight: theme.spacing.xs,
  },
});

export default PostCard;

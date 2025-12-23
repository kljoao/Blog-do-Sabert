import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    <TouchableOpacity
      className="bg-surface rounded-lg p-lg mb-md mx-md border-l-4 border-l-secondary shadow-md"
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Header com categoria visual */}
      <View className="flex-row justify-between items-center mb-md">
        <View className="flex-row items-center bg-primary-light/20 px-sm py-xs rounded-sm gap-xs">
          <Ionicons name="newspaper-outline" size={16} color="#2E7D32" />
          <Text className="text-xs font-semibold text-primary uppercase tracking-wide">
            Artigo
          </Text>
        </View>
        {post.data_criacao && (
          <Text className="text-xs text-text-light font-medium">
            {formatDate(post.data_criacao)}
          </Text>
        )}
      </View>

      {/* Título */}
      <Text className="text-xl font-bold text-text leading-7 mb-sm" numberOfLines={2}>
        {post.titulo || 'Sem título'}
      </Text>

      {/* Conteúdo */}
      {post.conteudo && (
        <Text className="text-md text-text-secondary leading-6 mb-md" numberOfLines={3}>
          {post.conteudo}
        </Text>
      )}

      {/* Footer com autor e ação */}
      <View className="flex-row justify-between items-center pt-sm border-t border-border-light">
        <View className="flex-row items-center flex-1">
          <View className="w-8 h-8 rounded-full bg-primary justify-center items-center mr-sm">
            <Ionicons name="person" size={16} color="#FFFFFF" />
          </View>
          <Text className="text-sm font-medium text-text-secondary flex-1">
            {post.autor || 'Autor desconhecido'}
          </Text>
        </View>
        <View className="flex-row items-center gap-xs">
          <Text className="text-sm font-semibold text-primary">Ler mais</Text>
          <Ionicons name="arrow-forward" size={14} color="#2E7D32" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;

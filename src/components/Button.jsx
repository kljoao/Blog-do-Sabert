import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  className,
}) => {
  // Classes base
  const baseClasses = 'flex-row items-center justify-center rounded-lg';

  // Classes de tamanho
  const sizeClasses = {
    small: 'px-md py-sm min-h-[40px] rounded-md',
    medium: 'px-lg py-md min-h-[52px]',
    large: 'px-xl py-lg min-h-[60px] rounded-xl',
  };

  // Classes de variante
  const variantClasses = {
    primary: 'bg-primary shadow-sm',
    secondary: 'bg-secondary shadow-sm',
    outline: 'bg-transparent border-2 border-primary',
    accent: 'bg-accent shadow-sm',
    danger: 'bg-danger shadow-sm',
    ghost: 'bg-transparent',
  };

  // Classes de texto
  const textClasses = {
    primary: 'text-text-on-primary font-bold',
    secondary: 'text-text-on-secondary font-bold',
    outline: 'text-primary font-bold',
    accent: 'text-text-on-primary font-bold',
    danger: 'text-text-on-primary font-bold',
    ghost: 'text-primary font-semibold',
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-md',
    large: 'text-lg',
  };

  // Classe de desabilitado
  const disabledClasses = disabled || loading ? 'opacity-60' : '';

  // Ícone size
  const iconSizes = {
    small: 18,
    medium: 20,
    large: 24,
  };

  // Cor do ícone
  const getIconColor = () => {
    if (variant === 'outline' || variant === 'ghost') return '#2E7D32';
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className || ''}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getIconColor()} size="small" />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={iconSizes[size]}
              color={getIconColor()}
              className="mr-sm"
            />
          )}
          <Text className={`${textClasses[variant]} ${textSizeClasses[size]}`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

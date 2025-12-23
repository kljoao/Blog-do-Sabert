import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const styles = [buttonStyles.button];

    // Size
    if (size === 'small') {
      styles.push(buttonStyles.buttonSmall);
    } else if (size === 'large') {
      styles.push(buttonStyles.buttonLarge);
    }

    // Variant
    if (variant === 'secondary') {
      styles.push(buttonStyles.buttonSecondary);
    } else if (variant === 'outline') {
      styles.push(buttonStyles.buttonOutline);
    } else if (variant === 'danger') {
      styles.push(buttonStyles.buttonDanger);
    } else if (variant === 'accent') {
      styles.push(buttonStyles.buttonAccent);
    } else if (variant === 'ghost') {
      styles.push(buttonStyles.buttonGhost);
    }

    if (disabled || loading) {
      styles.push(buttonStyles.buttonDisabled);
    }

    if (style) {
      styles.push(style);
    }

    return styles;
  };

  const getTextStyle = () => {
    const styles = [buttonStyles.buttonText];

    if (size === 'small') {
      styles.push(buttonStyles.buttonTextSmall);
    } else if (size === 'large') {
      styles.push(buttonStyles.buttonTextLarge);
    }

    if (variant === 'outline' || variant === 'ghost') {
      styles.push(buttonStyles.buttonTextOutline);
    } else if (variant === 'secondary') {
      styles.push(buttonStyles.buttonTextSecondary);
    }

    if (textStyle) {
      styles.push(textStyle);
    }

    return styles;
  };

  const getIconColor = () => {
    if (variant === 'outline' || variant === 'ghost') {
      return theme.colors.primary;
    } else if (variant === 'secondary') {
      return theme.colors.textOnSecondary;
    }
    return theme.colors.textOnPrimary;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getIconColor()} size={size === 'small' ? 'small' : 'small'} />
      ) : (
        <View style={buttonStyles.content}>
          {icon && (
            <Ionicons
              name={icon}
              size={size === 'small' ? 18 : size === 'large' ? 24 : 20}
              color={getIconColor()}
              style={buttonStyles.icon}
            />
          )}
          <Text style={getTextStyle()}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    ...theme.shadows.sm,
  },
  buttonSmall: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    minHeight: 40,
    borderRadius: theme.borderRadius.md,
  },
  buttonLarge: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    minHeight: 60,
    borderRadius: theme.borderRadius.xl,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    ...theme.shadows.none,
  },
  buttonAccent: {
    backgroundColor: theme.colors.accent,
  },
  buttonDanger: {
    backgroundColor: theme.colors.danger,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    ...theme.shadows.none,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.disabled,
    borderColor: theme.colors.disabled,
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  buttonText: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.textOnPrimary,
  },
  buttonTextSmall: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.semibold,
  },
  buttonTextLarge: {
    fontSize: theme.fonts.sizes.lg,
  },
  buttonTextOutline: {
    color: theme.colors.primary,
  },
  buttonTextSecondary: {
    color: theme.colors.textOnSecondary,
  },
});

export default Button;

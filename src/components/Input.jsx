import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  icon,
  rightIcon,
  onRightIconPress,
  style,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const iconColor = isFocused ? theme.colors.primary : theme.colors.textLight;

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          disabled && styles.inputContainerDisabled,
        ]}
      >
        {icon && (
          <Ionicons name={icon} size={20} color={iconColor} style={styles.leftIcon} />
        )}
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            icon && styles.inputWithLeftIcon,
            (secureTextEntry || rightIcon) && styles.inputWithRightIcon,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.rightIconButton}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={theme.colors.textLight}
            />
          </TouchableOpacity>
        )}
        {!secureTextEntry && rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIconButton}>
            <Ionicons name={rightIcon} size={20} color={theme.colors.textLight} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={14} color={theme.colors.danger} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    minHeight: 52,
  },
  inputContainerFocused: {
    borderColor: theme.colors.primary,
    ...theme.shadows.sm,
  },
  inputContainerError: {
    borderColor: theme.colors.danger,
  },
  inputContainerDisabled: {
    backgroundColor: theme.colors.backgroundLight,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.text,
    paddingVertical: theme.spacing.sm,
  },
  inputWithLeftIcon: {
    marginLeft: theme.spacing.xs,
  },
  inputWithRightIcon: {
    marginRight: theme.spacing.xs,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: theme.spacing.md,
  },
  leftIcon: {
    marginRight: theme.spacing.xs,
  },
  rightIconButton: {
    padding: theme.spacing.xs,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  errorText: {
    fontSize: theme.fonts.sizes.xs,
    color: theme.colors.danger,
    marginLeft: theme.spacing.xs,
    flex: 1,
  },
});

export default Input;

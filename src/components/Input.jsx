import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  className,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const borderColor = error ? 'border-danger' : isFocused ? 'border-primary' : 'border-border';
  const iconColor = isFocused ? '#2E7D32' : '#9E9E9E';

  return (
    <View className={`mb-md ${className || ''}`}>
      {label && (
        <Text className="text-sm font-semibold text-text mb-xs tracking-wide">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center bg-surface border-2 ${borderColor} rounded-lg px-md min-h-[52px] ${
          disabled ? 'bg-background-light opacity-60' : ''
        } ${isFocused ? 'shadow-sm' : ''}`}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={iconColor}
            className="mr-xs"
          />
        )}
        <TextInput
          className={`flex-1 text-md text-text py-sm ${icon ? 'ml-xs' : ''} ${
            secureTextEntry || rightIcon ? 'mr-xs' : ''
          } ${multiline ? 'min-h-[100px] pt-md' : ''}`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9E9E9E"
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
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="p-xs"
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#9E9E9E"
            />
          </TouchableOpacity>
        )}
        {!secureTextEntry && rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            className="p-xs"
          >
            <Ionicons name={rightIcon} size={20} color="#9E9E9E" />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View className="flex-row items-center mt-xs px-xs">
          <Ionicons name="alert-circle" size={14} color="#F44336" />
          <Text className="text-xs text-danger ml-xs flex-1">
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Input;

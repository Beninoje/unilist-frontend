import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PasswordStrengthBar from "./password-strengthen-bar";

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  error?: string;
  icon: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;

};

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  error,
  icon,
  rightIcon,
  onRightIconPress,
}: InputFieldProps) => {
  return (
    <View className={`${label === "First Name" || label === "Last Name" ? "mt-0" : "mt-4"}`}>
        <Text className="text-gray-700 text-sm font-medium mb-2">{label} <Text className="text-red-600">*</Text></Text>
      <View className="relative flex flex-row items-center">
        <Ionicons
          name={icon}
          size={20}
          color="#6B7280"
          className="absolute top-3.5 left-4 z-10"
        />
        <TextInput
          className={`bg-white border rounded-xl px-12 py-4 text-gray-900 flex-1 ${
            error ? "border-red-500" : "border-gray-200"
          }`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          textContentType="oneTimeCode"
          autoComplete="off"
          autoCorrect={false}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} className="absolute right-3 top-4">
            <Ionicons name={rightIcon} size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
      
    </View>
  );
};

export default InputField;

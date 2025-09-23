import InputField from '@/components/form/input-field';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TextInputProps
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface InputFieldProps extends TextInputProps{
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  icon: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

export default function SignIn() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSignIn = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Welcome Back!',
        'You have successfully signed in.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (value: string) =>
    setFormData((prev) => ({ ...prev, email: value }));

  const handlePasswordChange = (value: string) =>
    setFormData((prev) => ({ ...prev, password: value }));



  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
          <View className="flex-1 px-6 pt-8">
            {/* Header */}
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="log-in" size={32} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</Text>
              <Text className="text-gray-600 text-center">
                Sign in to your account to continue
              </Text>
            </View>

            {/* Form */}
            <View className="flex-1">
            <InputField
              label="Email Address"
              
              value={formData.email}
              onChangeText={handleEmailChange}
              placeholder="john.doe@example.com"
              keyboardType="email-address"
              icon="mail-outline"
              error={errors.email}
            />

            <InputField
              label="Password"
              value={formData.password}
              onChangeText={handlePasswordChange}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              icon="lock-closed-outline"
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowPassword(!showPassword)}
              error={errors.password}
            />

              {/* Forgot Password */}
              <TouchableOpacity className="self-end mb-6 mt-2">
                <Text className="text-blue-600 text-sm font-medium">Forgot Password?</Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <TouchableOpacity
                onPress={handleSignIn}
                disabled={isLoading}
                className={`bg-blue-600 rounded-xl py-4 ${
                  isLoading ? 'opacity-50' : ''
                }`}
              >
                <Text className="text-white text-center text-lg font-semibold">
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="py-6">
              <View className="flex-row items-center justify-center">
                <Text className="text-gray-600">Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
                  <Text className="text-blue-600 font-semibold">Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

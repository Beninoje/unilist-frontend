import InputField from '@/components/form/input-field';
import PasswordStrengthBar from '@/components/form/password-strengthen-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}


export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const error =
    formData.confirmPassword.length > 0 && formData.confirmPassword !== formData.password
      ? "Passwords do not match"
      : undefined;


  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFirstNameChange = (value: string) =>
    setFormData((prev) => ({ ...prev, firstName: value }));

  const handleLastNameChange = (value: string) =>
    setFormData((prev) => ({ ...prev, lastName: value }));

  const handleEmailChange = (value: string) =>
    setFormData((prev) => ({ ...prev, email: value }));

  const handlePasswordChange = (value: string) =>
    setFormData((prev) => ({ ...prev, password: value }));

  const handleConfirmPasswordChange = (value: string) =>
    setFormData((prev) => ({ ...prev, confirmPassword: value }));

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success!',
        'Your account has been created successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
          <View className="flex-1 px-6 pt-8 ">
            {/* Header */}
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="person-add" size={32} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">Create Account</Text>
              <Text className="text-gray-600 text-center">
                Join us today and start your journey
              </Text>
            </View>

            {/* Form */}
            <View className="flex-1">
              <View className="flex-row gap-4">
                <View className="flex-1 ">
                  <InputField
                    label="First Name"
                    value={formData.firstName}
                    onChangeText={handleFirstNameChange}
                    placeholder="John"
                    icon="person-outline"
                    error={errors.firstName}
                  />
                </View>
                <View className="flex-1">
                  <InputField
                    label="Last Name"
                    value={formData.lastName}
                    onChangeText={handleLastNameChange}
                    placeholder="Doe"
                    icon="person-outline"
                    error={errors.lastName}
                  />
                </View>
              </View>

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
                rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
                onRightIconPress={() => setShowPassword(!showPassword)}
                error={errors.password}
              />
              <PasswordStrengthBar password={formData.password}/>
              

              <InputField
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                icon="lock-closed-outline"
                rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                error={errors.confirmPassword}

              />
              {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}


              {/* Sign Up Button */}
              <TouchableOpacity
                onPress={handleSignUp}
                disabled={isLoading}
                className={`bg-blue-600 rounded-xl py-4 mt-6 ${
                  isLoading ? 'opacity-50' : ''
                }`}
              >
                <Text className="text-white text-center text-lg font-semibold">
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>

              {/* Terms */}
              <Text className="text-gray-500 text-xs text-center mt-4 px-4">
                By creating an account, you agree to our{' '}
                <Text className="text-blue-600 font-medium">Terms of Service</Text>
                {' '}and{' '}
                <Text className="text-blue-600 font-medium">Privacy Policy</Text>
              </Text>
            </View>

            {/* Footer */}
            <View className="py-6">
              <View className="flex-row items-center justify-center">
                <Text className="text-gray-600">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text className="text-blue-600 font-semibold">Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}
import InputField from '@/components/form/input-field';
import PasswordStrengthBar from '@/components/form/password-strengthen-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ReactNativeModal } from "react-native-modal";
import {
  ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaFrameContext, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { signUp, verifyOTP } from '../api/auth';
import { FormData, FormErrors } from '@/types/type';
import { images } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  console.log("Success modal:",showSuccessModal);

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const error =
    formData.confirmPassword.length > 0 && formData.confirmPassword !== formData.password && formData.password.length > 0
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
  const validateVerifyCode = () => {
    const newErrors: FormErrors = {};

    if(!verification.code){
      newErrors.code = "Verification code is required"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

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
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }
      
      const res = await signUp(payload);
      
      console.log(res);
      setVerification({
        ...verification,
        state:"pending"
      })
      
    } catch (err:any) {
      Alert.alert("Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const onPressVerifyOTP = async () => {
    if(!validateVerifyCode()) return;
    
    try {
      setIsLoading(true);
      const payload = {
        verificationCode: verification.code, 
        email:formData.email
      }

      const res = await verifyOTP(payload);

      console.log("Verofication Log: ",res);

      await AsyncStorage.setItem('jwt', res.token);
      
      await AsyncStorage.setItem('user', JSON.stringify({
        firstName: res.firstName,
        lastName: res.lastName, 
        email: res.email,
      }));

      setVerification({
        ...verification,
        state:"success"
      })

    } catch (error) {
      setVerification({
        ...verification,
        state:"failed"
      })
    }finally{
      setIsLoading(false);
    }
  }


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
            <ReactNativeModal
              isVisible={verification.state === "pending"}
              onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[250px]">
            <Text className="font-bold text-2xl mb-2">
              Verification
            </Text>
            <Text className="mb-5">
              We've sent a verification code to <Text className='font-semibold'>{formData.email}</Text>.
            </Text>
            <InputField
              label={"Code"}
              icon="lock-closed"
              placeholder={"123456"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
              error={errors.code}
            />
            <TouchableOpacity
                onPress={onPressVerifyOTP}
                className="mt-5 bg-blue-500 py-3 rounded-xl flex-row justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white text-center font-semibold">
                    Verify Code
                  </Text>
                )}
              </TouchableOpacity>
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setTimeout(()=>router.push('/(tabs)/home'),300)
                setShowSuccessModal(false);
              }}
              className="mt-5 bg-blue-500 py-3 rounded-xl flex-row justify-center items-center"
            >
              <Text className='text-white text-center font-semibold'>Browse Home</Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
          </View> 
      </ScrollView>
    </SafeAreaView>
  );
}
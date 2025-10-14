import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FormErrors, UpdateUserFormData, UpdateUserFormErrors, UserProps } from "@/types/type";
import InputField from "../form/input-field";
import { updateProfile } from "@/app/api/profile";
import PasswordStrengthBar from "../form/password-strengthen-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");

export const ProfileDrawer = ({ visible, onClose, user, token }: any) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<UpdateUserFormData>({
      firstName: user.firstName,
      lastName: user.lastName,
      password: '',
      email:user.email
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<UpdateUserFormErrors>({});
  const handlePasswordChange = (value: string) => setFormData((prev) => ({ ...prev, password: value }));
  const handleFirstNameChange = (value: string) => setFormData((prev) => ({ ...prev, firstName: value }));
  const handleLastNameChange = (value: string) => setFormData((prev) => ({ ...prev, lastName: value }));

  const hasChanges =
  formData.firstName !== user.firstName ||
  formData.lastName !== user.lastName ||
  formData.password.trim() !== "";

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      slideAnim.setValue(height);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20, // adjust for slower spring
        stiffness: 150,
      }).start();
    } else if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    }
  }, [visible]);

  const validateForm = () => {
    const newErrors: UpdateUserFormErrors = {};

    if (!formData.firstName!.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName!.trim()) {
      newErrors.lastName = 'Last name is required';
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSave = async () => {
    if(!validateForm()) return;
    try {
      const body: UpdateUserFormData = {};
      if (formData.firstName) body.firstName = formData.firstName;
      if (formData.lastName) body.lastName = formData.lastName;
      if (formData.password) body.password = formData.password;
      if (formData.email) body.email = formData.email;


      const response = await updateProfile(body, token);
      await AsyncStorage.setItem('user', JSON.stringify({
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
      }));

      Alert.alert("Success", "Profile updated successfully!");
      // onClose(updatedUser); 
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };
  

  if (!isVisible) return null;

  return (
    <Modal visible={true} transparent animationType="none" onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-end">
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            height: "100%",
            backgroundColor: "#f9fafb",
            padding: 20,
            paddingTop: 70,
          }}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="black" />
            </TouchableOpacity>
          </View>

          {/* Profile Image */}
          <View className="items-center mt-2">
            <Image
              source={{ uri: user.avatar || "https://i.pravatar.cc/150?img=12" }}
              className="w-28 h-28 rounded-full border-4 border-blue-400"
            />
          </View>

          {/* Inputs */}
          <View className="mt-8 gap-5">
            <View>
              <Text className="text-gray-700 font-medium mb-1">Email</Text>
              <TextInput
                value={user.email}
                editable={false}
                className="bg-white text-zinc-500 rounded-xl px-4 py-3 border border-gray-200"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-1">First Name</Text>
              <TextInput
                value={formData.firstName}
                onChangeText={handleFirstNameChange}
                placeholder="Enter first name"
                className={`bg-white rounded-xl px-4 py-3 border ${
                  errors.firstName ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.firstName && (
                <Text className="text-red-500 text-xs mt-1">{errors.firstName}</Text>
              )}
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-1">Last Name</Text>
              <TextInput
                value={formData.lastName}
                onChangeText={handleLastNameChange}
                placeholder="Enter last name"
                className={`bg-white rounded-xl px-4 py-3 border ${
                  errors.lastName ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.lastName && (
                <Text className="text-red-500 text-xs mt-1">{errors.lastName}</Text>
              )}
            </View>


            <View>
              <Text className="text-gray-700 font-medium mb-1">Change Password</Text>
              <View className="relative">
                <TextInput
                  value={formData.password}
                  onChangeText={handlePasswordChange}
                  placeholder="New password"
                  secureTextEntry={!showPassword} // toggle visibility
                  className="bg-white rounded-xl px-4 py-3 border border-gray-200"
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <PasswordStrengthBar password={formData.password}/>
            </View>


            <TouchableOpacity
              className={`rounded-xl py-4 mt-4 ${
                hasChanges ? "bg-blue-500" : "bg-gray-300"
              }`}
              onPress={handleSave}
              disabled={!hasChanges} // disable if no changes
            >
              <Text
                className={`text-white font-semibold text-center text-base ${
                  !hasChanges ? "opacity-50" : ""
                }`}
              >
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

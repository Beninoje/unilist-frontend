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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { height } = Dimensions.get("window");

export const ProfileDrawer = ({ visible, onClose }: any) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [isVisible, setIsVisible] = useState(false);

  const [firstName, setFirstName] = useState("Benjamin");
  const [lastName, setLastName] = useState("Noje");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  useEffect(() => {
    if (visible) {
      setIsVisible(true); 
      slideAnim.setValue(height); 
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 100,
        stiffness: 150,
      }).start();
    } else if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false); 
      });
    }
  }, [visible]);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setProfileImage(result.assets[0].uri);
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
            <TouchableOpacity onPress={handlePickImage}>
              <Image
                source={{ uri: profileImage }}
                className="w-28 h-28 rounded-full border-4 border-blue-400"
              />
              <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2">
                <Text className="text-white text-xs font-semibold">Edit</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Inputs */}
          <View className="mt-8 space-y-5">
            <View>
              <Text className="text-gray-700 font-medium mb-1">First Name</Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
                className="bg-white rounded-xl px-4 py-3 border border-gray-200"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-1">Last Name</Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
                className="bg-white rounded-xl px-4 py-3 border border-gray-200"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-1">Change Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="New password"
                secureTextEntry
                className="bg-white rounded-xl px-4 py-3 border border-gray-200"
              />
            </View>

            <TouchableOpacity className="bg-blue-500 rounded-xl py-4 mt-4">
              <Text className="text-white font-semibold text-center text-base">
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

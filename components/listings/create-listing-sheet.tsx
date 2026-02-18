import { updateProfile } from "@/app/api/profile";
import { CreateListingFormData, UpdateUserFormData, UpdateUserFormErrors } from "@/types/type";
import { signOut } from "@/utils/auth";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PasswordStrengthBar from "../form/password-strengthen-bar";
import { uploadImage } from "@/utils/firebase/imageUpload";
import * as ImagePicker from "expo-image-picker";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/hooks/context/user-context";
import { createListing } from "@/app/api/listings";
import { ScrollView } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";

const { height } = Dimensions.get("window");

interface FormData {
  title: string;
  price: string; // Keep as string for input handling
  description: string;
  category: string;
  condition: string;
}

export const  CreateListingSheet = ({ visible, onClose }: any) => {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [isVisible, setIsVisible] = useState(false);
  

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<UpdateUserFormErrors>({});
  

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

    const {user, loading, setUser} = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<FormData>({
        title: "",
        price: "",
        description: "",
        category: "",
        condition: ""
    });

    const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
    const categories = ["Electronics", "Books", "Fashion", "Sports", "Home", "Other"];

    const pickImage = async () => {
        if (images.length >= 6) {
            Alert.alert("Limit Reached", "You can only upload up to 6 images");
            return;
        }
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets[0].uri) {
            setImages([...images, result.assets[0].uri]);
        }
    };

    const handleSubmit = async () => {
        try {
            // Validate form data
            if (!formData.title || !formData.price || !formData.category || !formData.condition) {
                Alert.alert("Error", "Please fill in all required fields");
                return;
            }

            if (images.length < 2) {
                Alert.alert("Error", "Please add at least 2 images");
                return;
            }

            
            setIsSubmitting(true);

            
            const uploadPromises = images.map(async (imageUri) => {
                const response = await fetch(imageUri);
                const blob = await response.blob();
                return uploadImage(blob);
            });

            const uploadedImageUrls = await Promise.all(uploadPromises);

            // Parse price to number and prepare listing data
            const priceNumber = parseFloat(formData.price.replace(/[^0-9.]/g, ''));
            
            if (isNaN(priceNumber)) {
                throw new Error("Invalid price format");
            }

            // Prepare listing data with correct types
            const submissionData: CreateListingFormData = {
                title: formData.title,
                price: priceNumber,
                description: formData.description,
                category: formData.category,
                condition: formData.condition,
                images: uploadedImageUrls.filter((url): url is string => url !== null)
            };

            

            console.log("Starting listing creation with data:", submissionData);
            
            try {
                const response = await createListing(submissionData, user!.token);

                setUser((prev)=>prev ? { ...prev, listings: response } : prev)

                // Consider it a success if we get a response and there's no error
                if (response && !response.error) {
                    Alert.alert(
                        "Success!",
                        "Your listing has been created successfully.",
                        [
                            {
                                text: "OK",
                                onPress: () => onClose(),
                            }
                        ]
                    );
                    setFormData({
                        title: "",
                        price: "",
                        description: "",
                        category: "",
                        condition: ""
                    });
                    setImages([]);
                    setIsSubmitting(false);

                } else {
                    console.error("Server response indicates failure:", response);
                    throw new Error(
                        response?.error || 
                        response?.message || 
                        "Failed to create listing. Please try again."
                    );
                }
            } catch (apiError: any) {
                console.error("API error details:", apiError);
                throw new Error(
                    `Failed to create listing: ${apiError?.message || 'Unknown error occurred'}`
                );
            }

        } catch (error: any) {
            console.error("Final error:", error);
            // Show error message with more details
            Alert.alert(
                "Error Creating Listing",
                error?.message || "Failed to create listing. Please try again.",
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ]
            );
        } finally {
            
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
            paddingTop: 70,
          }}
        >
            {/* Header */}
            <View className="flex-row justify-start items-center px-3  pb-3 border-b border-zinc-200">
                <TouchableOpacity onPress={() => {
                    onClose();
                }}>
                    <Ionicons name="close" size={28} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 p-4">
                <View className="space-y-4">
                    <View>
                        <Text className="text-gray-700  text-lg font-semibold">Title <Text className="text-red-500">*</Text></Text>
                        <TextInput
                            value={formData.title}
                            onChangeText={(text) => setFormData({...formData, title: text})}
                            placeholder="What are you selling?"
                            placeholderTextColor="#9CA3AF"
                            className="bg-gray-50 p-3 rounded-lg border border-gray-200 "
                        />
                    </View>

                    <View className="pt-4">
                        <Text className="text-gray-700  text-lg font-semibold">Price <Text className="text-red-500">*</Text></Text>
                        <TextInput
                            value={formData.price}
                            onChangeText={(text) => {
                                // Only allow numbers and one decimal point
                                const formatted = text.replace(/[^0-9.]/g, '')
                                    .replace(/(\..*)\./g, '$1'); // Allow only one decimal point
                                setFormData({...formData, price: formatted});
                            }}
                            placeholder="0.00"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="decimal-pad"
                            className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                        />
                    </View>
                    <View className="pt-4">
                        <Text className="text-gray-700 text-lg font-semibold">Description <Text className="text-red-500">*</Text></Text>
                        <TextInput
                            value={formData.description}
                            onChangeText={(text) => setFormData({...formData, description: text})}
                            placeholder="Describe your item..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            numberOfLines={6}
                            className="bg-gray-50 p-3 h-32 rounded-lg border border-gray-200"
                            textAlignVertical="top"
                        />
                    </View>

                    <View className="pt-4">
                        <Text className="text-gray-700  text-lg font-semibold">Category <Text className="text-red-500">*</Text></Text>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            className="flex-row -mx-1"
                        >
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    onPress={() => setFormData({...formData, category: cat})}
                                    className={`m-1 px-4 py-2 rounded-full ${
                                        formData.category === cat ? 'bg-blue-500' : 'bg-gray-200'
                                    }`}
                                >
                                    <Text className={
                                        formData.category === cat ? 'text-white' : 'text-gray-700'
                                    }>{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View className="pt-4">
                        <Text className="text-gray-700  text-lg font-semibold">Condition <Text className="text-red-500">*</Text></Text>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            className="flex-row -mx-1"
                        >
                            {conditions.map((cond) => (
                                <TouchableOpacity
                                    key={cond}
                                    onPress={() => setFormData({...formData, condition: cond})}
                                    className={`m-1 px-4 py-2 rounded-full ${
                                        formData.condition === cond ? 'bg-blue-500' : 'bg-gray-200'
                                    }`}
                                >
                                    <Text className={
                                        formData.condition === cond ? 'text-white' : 'text-gray-700'
                                    }>{cond}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View>
                    <View className="mb-8">
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-gray-700 mt-6 text-lg font-semibold">Photos <Text className="text-red-500">*</Text></Text>
                                <Text className="text-gray-400 text-sm">You need to upload <Text className="text-blue-500 font-semibold">at least 2 photos</Text></Text>
                            </View>
                        </View>
                    </View>
                    {/* Images Section */}
                                        <View className="flex flex-row flex-wrap justify-between mb-6">
                        {[...Array(6)].map((_, slot) => {
                            const image = images[slot];
                            return (
                                <View key={slot} className="relative w-[30%] mb-4">
                                    {image ? (
                                        <>
                                            <Image 
                                                source={{ uri: image }} 
                                                className="w-full aspect-square rounded-lg"
                                            />
                                            <TouchableOpacity 
                                                className="absolute -top-3 -right-3 bg-red-500 rounded-full p-1.5"
                                                onPress={() => setImages(images.filter((_, i) => i !== slot))}
                                            >
                                                <Feather name="x" size={16} color="white" />
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <TouchableOpacity 
                                            onPress={images.length < 6 ? pickImage : undefined}
                                            className={`w-full aspect-square rounded-lg items-center justify-center border-2 border-dashed ${
                                                images.length < 6 ? 'border-gray-300 bg-gray-50' : 'border-gray-200 bg-gray-100'
                                            }`}
                                        >
                                            <Feather 
                                                name="plus" 
                                                size={24} 
                                                color={images.length < 6 ? "#9CA3AF" : "#D1D5DB"} 
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                        
                </View>
                <View className="mb-10">
                            <TouchableOpacity 
                                onPress={handleSubmit}
                                className="bg-blue-500 w-full py-4 rounded-xl items-center"
                            >
                                <Text className="text-white font-semibold text-lg">Post Listing</Text>
                            </TouchableOpacity>
                </View>
            </ScrollView>
                <Modal
                    transparent
                    visible={isSubmitting}
                    animationType="fade"
                >
                    <View className="flex-1 bg-black/50 ">
                        <BlurView intensity={10} className="p-6 w-full h-full flex items-center justify-center">
                            <View className="items-center">
                                <ActivityIndicator size="large" color="#60a5fa" />
                                <Text className="text-white font-semibold mt-4">
                                    Creating your listing...
                                </Text>
                                <Text className="text-white/80 text-sm mt-2">
                                    Uploading images and saving details
                                </Text>
                            </View>
                        </BlurView>
                    </View>
                </Modal>
        </Animated.View>
      </View>
    </Modal>
  );
};

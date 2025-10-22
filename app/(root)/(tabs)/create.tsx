import { Header } from "@/components/navigation/header";
import { useUser } from "@/hooks/context/user-context";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FormData {
  title: string;
  price: string;
  description: string;
  category: string;
  condition: string;
}

export default function Create() {
    const {user, loading} = useUser();
    const [images, setImages] = useState<string[]>([]);
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

    const handleSubmit = () => {
        if (!images.length) {
            Alert.alert("Error", "Please add at least one image");
            return;
        }
        if (!formData.title || !formData.price || !formData.category || !formData.condition) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }
        // Add your submission logic here
        console.log("Submitting:", { ...formData, images });
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <Header user={user} title="Create Listing"/>

            <ScrollView className="flex-1 p-4 mb-12">
                <View className="space-y-4">
                    <View>
                        <Text className="text-gray-700  text-lg font-semibold">Title <Text className="text-red-500">*</Text></Text>
                        <TextInput
                            value={formData.title}
                            onChangeText={(text) => setFormData({...formData, title: text})}
                            placeholder="What are you selling?"
                            className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                        />
                    </View>

                    <View className="pt-4">
                        <Text className="text-gray-700  text-lg font-semibold">Price <Text className="text-red-500">*</Text></Text>
                        <TextInput
                            value={formData.price}
                            onChangeText={(text) => setFormData({...formData, price: text})}
                            placeholder="$ 0.00"
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
                        <Text className="text-gray-700 mt-6 text-lg font-semibold">Photos <Text className="text-red-500">*</Text></Text>
                        <Text className="text-gray-400 text-sm">You need to upload <Text className="text-blue-500 font-semibold">at least 2 photos</Text></Text>
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
        </SafeAreaView>
    );
}   
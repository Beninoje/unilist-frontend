import { editListing } from "@/app/api/listings";
import { EditListingFormData } from "@/types/type";
import { imagesEqual } from "@/utils/listings";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
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
import { ScrollView } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

export const EditListingSheet = ({ visible, onClose, listing, user, setUser}: any) => {
    const slideAnim = useRef(new Animated.Value(height)).current;
    const [isVisible, setIsVisible] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [errors, setErrors] = useState<EditListingFormData>({});
    const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
    const categories = ["Electronics", "Books", "Fashion", "Sports", "Home", "Other"];
    const [formData, setFormData] = useState<EditListingFormData>({});
    
    useEffect(() => {
        if (visible && listing) {
            const listingImages = Array.isArray(listing.images) ? listing.images : [listing.images].flat();
            
            setFormData({
                title: listing.title,
                price: listing.price,
                description: listing.description,
                condition: listing.condition,
                category: listing.category,
                images: listingImages,
            });

            setImages(listingImages || []);
        } else if (!visible) {
            setFormData({
            title: "",
            price: 0,
            description: "",
            condition: "",
            category: "",
            images: [],
            });
            setImages([]);
        }
    }, [visible, listing]);
    

    const hasChanges =
  (formData.title ?? '') !== (listing?.title ?? '') ||
  Number(formData.price ?? 0) !== Number(listing?.price ?? 0) ||
  (formData.description ?? '') !== (listing?.description ?? '') ||
  (formData.condition ?? '') !== (listing?.condition ?? '') ||
  (formData.category ?? '') !== (listing?.category ?? '') ||
  !imagesEqual(images, listing.images ?? []);


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
    const newErrors: EditListingFormData = {};

    if (!formData.title!.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description!.trim()) {
        newErrors.description = 'Description is required';
    }
    if (!formData.price || isNaN(Number(formData.price))) {
        newErrors.price = 'Valid price is required';
    }
    if (!formData.condition) {
        newErrors.condition = 'Condition is required';
    }
    if (!formData.category) {
        newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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


  const handleEdit = async () => {
    if(!validateForm()) return;
    if (!images || images.length < 2) {
        Alert.alert("Error", "Please add at least 2 images");
        return;
    }
    try {
        const body: EditListingFormData = {};
        if (formData.title) body.title = formData.title;
        if (formData.price) body.price = formData.price;
        if (formData.description) body.description = formData.description;
        if (formData.condition) body.condition = formData.condition;
        if (formData.category) body.category = formData.category;
        body.images = formData.images;

        const response = await editListing(listing.id, body, user.token);

        setUser((current:any)=>{
            if (!current) return current;
            return {
                ...current,
                listings: current.listings.map((l:any)=>
                    l.id === listing.id ? { ...l, ...body } : l
                )
            }
        });

      Alert.alert("Success", "Listing updated successfully!"); 
      setFormData({
        title: "",
        price: 0,
        description: "",
        condition: "",
        category: "",
        images: [],
      });
      onClose();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleOnClose = () => {
    if(hasChanges){
        Alert.alert(
            "Discard Changes?", 
            "Are you sure you want to close without saving?", 
            [
                {
                    text: "Cancel", 
                    style: "cancel",
                },
                {
                    text: "Yes, Close", 
                    onPress: () => {
                        onClose();
                    }, 
                    style: "destructive",
                },
            ]
        )
    }else{
        onClose();
    }
}
  

  if (!isVisible) return null;

  return (
    <Modal visible={true} transparent animationType="none" onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-end">
                <Animated.View
                    style={{
                        transform: [{ translateY: slideAnim }],
                        height: "100%",
                        backgroundColor: "#f9fafb",
                        paddingHorizontal:20,
                        paddingTop: 40,
                        paddingBottom:20
                    }}
                >
                    {/* Sticky header positioned at the very top of the modal */}
                    <View style={{
                            position: 'absolute',
                            top: 50,
                            left: 0,
                            right: 0,
                            zIndex: 5,
                            backgroundColor: '#f9fafb',
                            paddingHorizontal: 20,
                            paddingTop: 16,
                            paddingBottom: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: '#e5e7eb'
                        }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={handleOnClose}
                            className=""
                            >
                                <Ionicons name="close" size={28} color="black" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>Edit Listing</Text>
                            <View style={{ width: 28 }} /> 
                        </View>
                    </View>

                    {/* Give the ScrollView a top margin equal to header height so content starts below it */}
                    <ScrollView className="" style={{ marginTop: 64 }}>
                <View className="space-y-4 mt-6">
                        <View>
                            <Text className="text-gray-700  text-lg font-semibold">Title <Text className="text-red-500">*</Text></Text>
                            <TextInput
                                value={formData.title}
                                onChangeText={(text) => setFormData({...formData, title: text})}
                                placeholder="What are you selling?"
                                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                            />
                            {errors.title && (
                                <Text className="text-red-500 text-xs mt-1">{errors.title}</Text>
                            )}
                        </View>

                        <View className="pt-4">
                            <Text className="text-gray-700  text-lg font-semibold">Price <Text className="text-red-500">*</Text></Text>
                            <TextInput
                                value={formData.price !== undefined ? formData.price.toString() : ''}
                                onChangeText={(text) => {
                                    // Only allow numbers and one decimal point
                                    const formatted = text.replace(/[^0-9.]/g, '')
                                        .replace(/(\..*)\./g, '$1'); // Allow only one decimal point
                                    setFormData({...formData, price: formatted});
                                }}
                                placeholder="0.00"
                                keyboardType="decimal-pad"
                                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                            />
                            {errors.price && (
                                <Text className="text-red-500 text-xs mt-1">{errors.price}</Text>
                            )}
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
                            {errors.description && (
                                <Text className="text-red-500 text-xs mt-1">{errors.description}</Text>
                            )}
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
                                {errors.category && (
                                    <Text className="text-red-500 text-xs mt-1">{errors.category}</Text>
                                )}
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
                                {errors.condition && (
                                    <Text className="text-red-500 text-xs mt-1">{errors.condition}</Text>
                                )}
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
                        onPress={handleEdit}
                        className="bg-blue-500 w-full py-4 rounded-xl items-center"
                    >
                        <Text className="text-white font-semibold text-lg">Edit Listing</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

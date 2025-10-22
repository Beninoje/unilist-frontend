import { Header } from "@/components/navigation/header";
import { useUser } from "@/hooks/context/user-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Listing {
  id: string;
  title: string;
  price: string;
  image: any;
  status: 'active' | 'sold' | 'draft';
}

export default function Listings() {
  const {user, loading} = useUser();
  
  const [myListings, setMyListings] = useState<Listing[]>([
    {
      id: '1',
      title: 'MacBook Pro 2025',
      price: '$1299',
      image: require('@/assets/images/technology.jpg'),
      status: 'active'
    },
    {
      id: '2',
      title: 'University Textbooks',
      price: '$50',
      image: require('@/assets/images/textbooks.jpg'),
      status: 'sold'
    }
  ]);

  const handleCreateListing = () => {
    router.push('/(root)/create' as any);
  };

  const handleEditListing = (id: string) => {
    router.push({
      pathname: '/(root)/edit-listing' as any,
      params: { id }
    });
  };

  const handleDeleteListing = (id: string) => {
    Alert.alert(
      "Delete Listing",
      "Are you sure you want to delete this listing?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Add your delete logic here
            setMyListings(current => current.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Listing }) => (
    <View className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
      <View className="flex-row">
        <Image 
          source={item.image}
          className="w-24 h-24"
          resizeMode="cover"
        />
        <View className="flex-1 p-3">
          <Text className="text-lg font-semibold text-gray-800" numberOfLines={1}>
            {item.title}
          </Text>
          <Text className="text-green-600 font-bold">{item.price}</Text>
          <View className="flex-row items-center mt-2">
            <View className={`rounded-full px-2 py-1 ${
              item.status === 'active' ? 'bg-green-100' :
              item.status === 'sold' ? 'bg-gray-100' : 'bg-yellow-100'
            }`}>
              <Text className={`text-xs ${
                item.status === 'active' ? 'text-green-700' :
                item.status === 'sold' ? 'text-gray-700' : 'text-yellow-700'
              }`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>
        <View className="justify-center pr-3">
          <TouchableOpacity 
            onPress={() => handleEditListing(item.id)}
            className="mb-2"
          >
            <Feather name="edit" size={20} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleDeleteListing(item.id)}
          >
            <Feather name="trash-2" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header user={user}/>
      <View className="px-6 flex-1">
        <View className="flex-row justify-between items-center my-6">
          <Text className="text-2xl font-bold">My Listings</Text>
          <TouchableOpacity 
            onPress={handleCreateListing}
            className="bg-[#60a5fa] w-10 h-10 rounded-full items-center justify-center"
          >
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={myListings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-4"
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-8">
              <Text className="text-gray-500 text-lg">No listings yet</Text>
              <Text className="text-gray-400 text-sm mt-1">Create your first listing!</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

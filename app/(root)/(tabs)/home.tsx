import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getSession } from "@/utils/auth";
import { UserProps } from "@/types/type";
import { Header } from "@/components/navigation/header";
import { SearchBar } from "@/components/form/search-bar";
import { CategoriesSwiper } from "@/components/ui/categories-swiper";
import { mockListings } from "@/constants";
import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "@/hooks/context/user-context";
import { fetchAllListings } from "@/app/api/listings";

export default function HomeScreen() {
  const {user, loading} = useUser();
  const [listings, setListings] = useState([]); 
  const [refreshing, setRefreshing] = useState(false);
  const [listingLoading, setLoading] = useState(false);

  const onRefresh = async () => {
  try {
    setRefreshing(true);
    await fetchAll(); // reuse your existing function
  } catch (error) {
    console.log("Refresh error:", error);
  } finally {
    setRefreshing(false);
  }
};

  const fetchAll = async () => {
    try {
      setLoading(true);
      const data = await fetchAllListings(user?.token as string);
      console.log("Data:", data)
      setListings(data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    if(user?.token){
      fetchAll();
    }
    
  }, [user?.token]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading session...</Text>
      </View>
    );
  }
  if (listingLoading) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-zinc-100">
      <ActivityIndicator size="large" color="#000" />
      <Text className="mt-2 text-gray-600">Loading listings...</Text>
    </SafeAreaView>
  );
}


  return (
    <SafeAreaView className="bg-zinc-100 flex-1">
      <Header user={user}/>
      <FlatList
        data={listings}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        className="mb-14 pt-6"
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 14 }}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10}}
        renderItem={({ item }) => (
          <View className="relative w-[48%] mb-4  overflow-hidden col-span-1 mt-4">
            <Image 
            source={{ uri:item.images[0]}}  
            className="w-full h-40"
            style={{ width: "100%", height: 150, borderRadius:10}}
            contentFit="cover" 
           />
            <TouchableOpacity
              className="absolute top-2 right-2 bg-black/80 rounded-full p-2"
              onPress={() => console.log("Add to favourites")}
            >
              <FontAwesome name="heart-o" size={18} color="white" />
            </TouchableOpacity>
            <View className="p-2">
              <Text className="font-bold text-lg">{item.price}</Text>
              <Text className="text-gray-500">{item.title}</Text>
            </View>

          </View>
        )}
        ListHeaderComponent={
          <>
            <View className="">
              <SearchBar />
              <CategoriesSwiper />
              <Text className="pt-8 text-2xl font-bold">More picks for you</Text>
            </View>
          </>
        }
        onEndReached={() => {
          // here you can fetch more listings when backend is ready
        }}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}

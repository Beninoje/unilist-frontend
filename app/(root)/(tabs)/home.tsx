import { fetchAllListings } from "@/app/api/listings";
import { addToFavourites, fetchUser, removeFromFavourites } from "@/app/api/profile";
import { SearchBar } from "@/components/form/search-bar";
import { Header } from "@/components/navigation/header";
import { CategoriesSwiper } from "@/components/ui/categories-swiper";
import { useUser } from "@/hooks/context/user-context";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Listing } from "@/types/type";
import { useFavourites } from "@/hooks/context/favourite-context";
import item from "@/components/listings/item";

export default function HomeScreen() {
  const {user, loading, setSession, updateUser, isFavourite, toggleFavourite} = useUser();
  const [listings, setListings] = useState<Listing[]>([]); 
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const data = await fetchAllListings(user!.token, 0);
      setListings(data.content);
      setHasMore(!data.last);
      setPage(1);
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchMore = async () => {
    if (loadingMore || !hasMore || initialLoading) return;

    try {
      setLoadingMore(true);
      const data = await fetchAllListings(user!.token, page);
      setListings(prev => [...prev, ...data.content]);
      setHasMore(!data.last);
      setPage(prev => prev + 1);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingMore(false);
    }
  };

  console.log(user)
  
  useEffect(() => {
  if (!user?.token) return;
  fetchInitial();
}, [user?.token]);

  const fetchInitial = async () => {
    try {
      setInitialLoading(true);
      const data = await fetchAllListings(user!.token, 0);
      setListings(data.content);
      setHasMore(!data.last);
      setPage(1);
    } catch (e) {
      console.log(e);
    } finally {
      setInitialLoading(false);
    }
  };
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading session...</Text>
      </View>
    );
  }



  return (
    <SafeAreaView className="bg-zinc-100 flex-1">
      <Header user={user as any} />
      <SearchBar />
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id.toString()}
        className="mb-14 pt-0"
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 14 }}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10}}
        renderItem={({ item }) => {
          const isFav = isFavourite(item.id.toString());
          return (
          <TouchableOpacity 
            className="relative w-[48%] mb-4  overflow-hidden col-span-1 mt-4" 
            onPress={() => router.push({ pathname: '/listing/[id]', params: { id: item.id.toString(), listing: JSON.stringify(item) } })}
          >
            <Image 
              source={{ uri:item.images[0]}}  
              className="w-full h-40"
              style={{ width: "100%", height: 150, borderRadius:10}}
              contentFit="cover" 
           />
            <TouchableOpacity
              className="absolute top-2 right-2 bg-black/80 rounded-full p-2"
              onPress={() => toggleFavourite(item.id.toString())}
            >
              <FontAwesome name={isFav ? `heart` : `heart-o`} size={18} color={`${isFav ? "#60a5fa" : "white"}`} />
            </TouchableOpacity>
            <View className="p-2">
              <Text className="font-bold text-lg">CA${item.price}</Text>
              <Text className="text-gray-500">{item.title}</Text>
            </View>

          </TouchableOpacity>
        )}}
        ListHeaderComponent={
          <>
            <View className="">
              
              <CategoriesSwiper />
              <Text className="pt-8 text-2xl font-bold">More picks for you</Text>
            </View>
          </>
        }
        onEndReached={() => {
          fetchMore();
        }}
        onEndReachedThreshold={0.4}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={
          loadingMore ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="small" color={"#0e0e0e"} />
            </View>
          ) : null
        }
        extraData={user?.favourites}

      />
    </SafeAreaView>
  );
}

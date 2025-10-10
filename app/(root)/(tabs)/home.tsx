import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getSession } from "@/utils/auth";
import { UserProps } from "@/types/type";
import { Header } from "@/components/navigation/header";
import { SearchBar } from "@/components/form/search-bar";
import { CategoriesSwiper } from "@/components/ui/categories-swiper";
import { mockListings } from "@/constants";

export default function HomeScreen() {
  const [user, setUser] = useState<UserProps>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(mockListings); // use mock for now

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();

      if (!session || !session.token) {
        router.replace("/(auth)/sign-up");
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    loadSession();
  }, []);

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
      <Header />
      <FlatList
        data={listings}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        className="mb-14"
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 14 }}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10}}
        renderItem={({ item }) => (
          <View className="w-[48%] mb-4 rounded-lg overflow-hidden col-span-1 mt-4">
            <Image source={{ uri: item.image }} className="w-full h-40" />
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
            </View>
          </>
        }
        onEndReached={() => {
          // here you can fetch more listings when backend is ready
        }}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}

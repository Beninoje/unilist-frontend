import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";

import { router } from "expo-router";
import { getSession } from "@/utils/auth";
import { UserProps } from "@/types/type";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/navigation/header";
import { SearchBar } from "@/components/form/search-bar";
import { CategoriesSwiper } from "@/components/ui/categories-swiper";

export default function HomeScreen() {
  const [user, setUser] = useState<UserProps>({
    firstName:"",
    lastName:"",
    email:""
  });
  const [loading, setLoading] = useState(true);

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
      <Header/>
      <View className="flex-1 p-4">
          <SearchBar/>
          <CategoriesSwiper/>
      </View>
    </SafeAreaView>
  );
}

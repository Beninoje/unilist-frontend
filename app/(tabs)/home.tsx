import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";

import { router } from "expo-router";
import { getSession } from "@/utils/auth";
import { UserProps } from "@/types/type";

export default function Home() {
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
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Welcome, {user?.firstName} {user?.lastName}👋</Text>
      <Text>Email: {user?.email}</Text>
    </View>
  );
}

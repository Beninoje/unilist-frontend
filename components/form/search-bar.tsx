import React from "react";
import { View, TextInput } from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

export const SearchBar = () => {
  return (
    <View className="w-full">
      <View className="relative w-full">
        <Feather name="search" size={20} color="black" className="absolute left-3 top-1/2 -translate-y-1/2 z-10"/>
        <TextInput
          placeholder="Search unilist"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 rounded-2xl pl-10 pr-4 h-14 border border-zinc-200 text-black"
        />
      </View>
    </View>
  );
};

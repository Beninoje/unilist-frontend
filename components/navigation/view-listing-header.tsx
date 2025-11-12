import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileDrawer } from "../profile/profile-sheet";
import { UserProps } from "@/types/type";
import { router } from "expo-router";



export const ViewListingHeader = () => {

  return (
      <View
        className="flex-row items-center justify-between p-4 mt-14 border-b border-gray-200"
      >
        <View>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="close" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-10">
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-horizontal" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
  );
};

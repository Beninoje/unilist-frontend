// components/navigation/Header.tsx
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export const Header = () => {

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        
      }}
    >
        <View>
            <Text className="text-black font-semibold text-2xl">
                unilist
            </Text>
        </View>
        <View className="flex-row items-center gap-10">
            <View className="">
                <TouchableOpacity>
                    <Feather name="bell" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View className="">
                <TouchableOpacity>
                    <MaterialCommunityIcons name="account-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>


      
    </View>
  );
};

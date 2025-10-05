// components/navigation/Header.tsx
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export const Header = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#2563eb",
      }}
    >
        <View>
            <Text className="text-white font-semibold text-2xl">
                unilist
            </Text>
        </View>
        <View className="flex-row items-center gap-4">
            <View className="">
                <TouchableOpacity>
                    <Feather name="bell" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <View className="">
                <TouchableOpacity>
                    <MaterialCommunityIcons name="account-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>


      
    </View>
  );
};

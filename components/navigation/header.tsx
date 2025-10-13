import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileDrawer } from "../profile/profile-sheet";


export const Header = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <View>
          <Text className="text-black font-semibold text-2xl">unilist</Text>
        </View>

        <View className="flex-row items-center gap-10">
          <TouchableOpacity onPress={() => setShowProfile(true)}>
            <MaterialCommunityIcons name="account-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ProfileDrawer visible={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
};

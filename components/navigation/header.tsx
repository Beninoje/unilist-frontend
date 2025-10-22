import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileDrawer } from "../profile/profile-sheet";
import { UserProps } from "@/types/type";

type HeaderProps = {
  user: UserProps;
  title?: string;
};

export const Header = ({user, title}:HeaderProps) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <View
        className="flex-row items-center justify-between p-4 border-b border-gray-200"
      >
        <View>
          <Text className="text-black font-semibold text-2xl">{title || "unilist"}</Text>
        </View>

        <View className="flex-row items-center gap-10">
          <TouchableOpacity onPress={() => setShowProfile(true)}>
            <MaterialCommunityIcons name="account-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ProfileDrawer visible={showProfile} onClose={() => setShowProfile(false)} user={user} token={user.token} />
    </>
  );
};

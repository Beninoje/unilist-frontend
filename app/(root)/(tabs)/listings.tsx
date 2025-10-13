import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSession } from "@/utils/auth";
import { router } from "expo-router";
import { UserProps } from "@/types/type";

export default function Listings() {

  return (
    <SafeAreaView className="flex-1 bg-zinc-100 px-6">
      <Text>Listings Page</Text>
    </SafeAreaView>
  );
}

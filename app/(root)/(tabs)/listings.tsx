import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSession } from "@/utils/auth";
import { router } from "expo-router";
import { UserProps } from "@/types/type";
import { Header } from "@/components/navigation/header";

export default function Listings() {

  return (
    <SafeAreaView className="flex-1 bg-zinc-100 px-6">
      <Header user={user}/>
    </SafeAreaView>
  );
}

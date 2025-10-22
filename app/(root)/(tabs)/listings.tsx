import Item from "@/components/listings/item";
import { Header } from "@/components/navigation/header";
import { useUser } from "@/hooks/context/user-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";


interface Listing {
  id: string;
  title: string;
  price: string;
  image: any;
  status: "active" | "sold" | "draft";
}

export default function Listings() {
  const { user } = useUser();

  const [myListings, setMyListings] = useState<Listing[]>([
    {
      id: "1",
      title: "MacBook Pro 2025",
      price: "$1299",
      image: require("@/assets/images/technology.jpg"),
      status: "active",
    },
    {
      id: "2",
      title: "University Textbooks",
      price: "$50",
      image: require("@/assets/images/textbooks.jpg"),
      status: "sold",
    },
  ]);

  const handleDeleteListing = (id: string) => {
    setMyListings((current) => current.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }: { item: Listing }) => (
  <Item
    item={item}
    onSwipe={() => handleDeleteListing(item.id)}
    onEdit={() => router.push({ pathname: '/(root)/(tabs)/home', params: { id: item.id } })}
  />
);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <Header user={user} />
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          My Listings
        </Text>
        <FlatList
          data={myListings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}

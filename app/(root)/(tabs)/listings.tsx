import Item from "@/components/listings/item";
import { Header } from "@/components/navigation/header";
import { useUser } from "@/hooks/context/user-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";


interface Listing {
  id: string;
  title: string;
  price: string;
  image: string[];
  status: "active" | "sold" | "draft";
  createdAt: string; // ISO string timestamp
}


export default function Listings() {
  const { user } = useUser();
  const [myListings, setMyListings] = useState<Listing[]>([]);
  useEffect(() => {
    if (user?.listings) {
      setMyListings(user.listings);
    }
  }, [user]);

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
        {myListings.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Feather name="inbox" size={64} color="#ccc" />
            <Text style={{ fontSize: 18, color: "#666", marginTop: 8 }}>
              You haven't created any listings yet.
            </Text>
          </View>
        ) : (
          <FlatList
            data={myListings}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

import { mockListings } from "@/constants";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";


export default function ListingsFeed() {
  const PAGE_SIZE = 10;
  const [listings, setListings] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = () => {
    setLoadingMore(true);

    // Simulate API call
    setTimeout(() => {
      const newItems = mockListings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      setListings((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
      setLoadingMore(false);
    }, 500);
  };

  return (
    <View className="grid grid-cols-2 gap-4 mt-4">
      {listings.map((item,index) => (
        <View key={`${item.id} - ${index}`} className="mb-4 bg-white rounded-lg overflow-hidden shadow col-span-1">
          <Image source={{ uri: item.image }} className="w-full h-60" />
          <View className="p-2">
            <Text className="font-bold text-lg">{item.title}</Text>
            <Text className="text-gray-500">{item.price}</Text>
            <View className="flex-row items-center mt-1">
              <Image source={{ uri: item.user.avatar }} className="w-6 h-6 rounded-full" />
              <Text className="ml-2 text-gray-700">{item.user.name}</Text>
            </View>
          </View>
        </View>
      ))}

      {loadingMore && <ActivityIndicator size="small" color="#000" />}
      
      {/* Trigger loading more when reaching bottom */}
      {listings.length < mockListings.length && (
        <View
          onLayout={({ nativeEvent }) => {
            const layoutHeight = nativeEvent.layout.height;
            // Simple lazy-load simulation: load next page when this footer renders
            if (!loadingMore) loadMore();
          }}
        />
      )}
    </View>
  );
}

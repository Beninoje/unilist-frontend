import { fetchListing } from "@/app/api/listings";
import { Header } from "@/components/navigation/header";
import { ViewListingHeader } from "@/components/navigation/view-listing-header";
import { useUser } from "@/hooks/context/user-context";
import { getRelativeTime } from "@/utils/listings";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
const ViewListingById = () => {
  const {user} = useUser();
  const params = useLocalSearchParams<{ id: string;}>();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState<any>(null);
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = params as { id?: string; };

  

  const fetchListingById = async (listingId: string) => {
    try {
      setLoading(true);
      const listing = await fetchListing(listingId, user?.token as string);
      setListing(listing);
    } catch (error) {
      console.warn('Failed to fetch listing by id:', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (id && user?.token) {
      fetchListingById(id);
    }
  }, [id, user?.token]);


  if(loading){
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Loading listing...</Text>
      </View>
    );
  }
  if (listing) {
    const imageWidth = Math.max(width, 320);
    return (
      <ScrollView className="flex-1 bg-white">
        <ViewListingHeader />
        <View className="relative">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            const idx = Math.round(x / imageWidth);
            setActiveIndex(idx);
          }}
        >
          {listing.images && listing.images.length > 0 && listing.images.map((uri: string, i: number) => (
            <View key={i} style={{ width: imageWidth }}>
              <Image source={{ uri }} style={{ height: 250 }} />
            </View>
          ))}
         
        </ScrollView>
          <View className="absolute bottom-0 left-1/2 -translate-x-1/2 flex-row z-10 mb-2 bg-black/50 px-2 py-1 rounded-full">
            {(listing.images || []).map((_: any, i: number) => (
              <View
                key={i}
                style={{
                  width: i === activeIndex ? 10 : 6,
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: i === activeIndex ? '#60a5fa' : '#e5e7eb',
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>
        </View>

        <View className="w-full p-4 flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-2xl font-bold">{listing.title}</Text>
            <Text className="text-lg font-semibold">CA${listing.price}</Text>
            <Text className="text-sm text-zinc-600">Listed {listing.createdAt ? getRelativeTime(listing.createdAt) : ""}</Text>
            <View className="w-full flex flex-col pt-3">
              <Text>Send seller a message</Text>
              <TextInput
                placeholder="Hello is this available?"
                multiline
                numberOfLines={4}
                className="bg-gray-200 px-3 py-2 h-24 rounded-lg border border-gray-300 text-zinc-800 mt-2"
                style={{ width: '100%' }}
                textAlignVertical="top"
              />
              <TouchableOpacity
                className="bg-blue-500 rounded-lg px-4 py-3 mt-3 items-center"
                onPress={() => {
                  console.log("Send message to seller")
                }}
              >
                <Text className="text-white font-semibold">Send</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-4 border-t border-gray-300 h-1"></View>
            <View className="pt-2">
              <Text className="text-lg font-semibold">Details</Text>
              <View className="flex-row justify-between mt-2">
                <Text className="text-md font-semibold">Condition</Text>
                <Text className="text-md font-semibold">{listing.condition}</Text>
              </View>
              <Text className="mt-4">{listing.description}</Text>
            </View>
          <View className="mt-4 border-t border-gray-300 h-1"></View>
          <View className="mt-4">
            <View>
              <Text className="text-lg font-semibold">Seller Information</Text>
            </View>
            <View className="mt-2 flex-row items-center gap-3">
              <View className="w-12 h-12 rounded-full border-2 border-blue-400 bg-zinc-200 flex items-center justify-center">
                <Text className="font-bold text-lg text-zinc-700 text-center">
                  {listing.ownerFirstName.charAt(0)}
                  {listing.ownerLastName.charAt(0)}
                </Text>
              </View>
              <View className="">
                <Text className="font-medium">{listing.ownerFirstName} {listing.ownerLastName}</Text>
                <Text className="text-gray-600">{listing.ownerEmail}</Text>
              </View>
            </View>
          </View>
          </View>
          <View className="">
            <TouchableOpacity
            
              className="absolute right-1 top-1 bg-black/40 rounded-full p-2"
              onPress={(e) => {
                e.stopPropagation();
                console.log("Add to favourites")
              }}
            >
              <FontAwesome name="heart-o" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <View className="p-4">
      <Text>Viewing listing {id}</Text>
      <Text className="text-sm text-gray-500 mt-2">No listing object passed. You can fetch details by id here.</Text>
    </View>
  );
};

export default ViewListingById;

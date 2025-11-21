import { fetchListing } from "@/app/api/listings";
import { fetchAllUserListings } from "@/app/api/profile";
import { EditListingSheet } from "@/components/listings/edit-listing-sheet";
import Item from "@/components/listings/item";
import { Header } from "@/components/navigation/header";
import { useUser } from "@/hooks/context/user-context";
import { Listing } from "@/types/type";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Modal, SafeAreaView, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";





export default function Listings() {
  const { user, setUser} = useUser();
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const swipeableRef = useRef<Swipeable>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeSwipeable, setActiveSwipeable] = useState<Swipeable | null>(null);


  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchAll(); // reuse your existing function
    } catch (error) {
      console.log("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchAll = async () => {
      try {
        setLoadingListings(true);
        const data = await fetchAllUserListings(user?.token as string);
        setMyListings(data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoadingListings(false);
      }
    }
  
    useEffect(() => {
      if(user?.token){
        fetchAll();
      }
      
    }, [user?.token]);

  const handleDeleteListing = (id: string) => {
    setMyListings((current) => current.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }: { item: Listing }) => (
  <Item
    item={item}
    onSwipe={() => handleDeleteListing(item.id)}
    onEdit={() => {
      setSelectedListing(item);
      setShowEditSheet(true);
    }}
    setDeleting={setDeleting}
    user={user}
    setUser={setUser}
    setActiveSwipeable={setActiveSwipeable}
    activeSwipeable={activeSwipeable}
  />
);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <Header user={user as any} />
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          My Listings
        </Text>
        {loadingListings ? (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <ActivityIndicator size="large" color="#60a5fa" />
          </View>
        ) : myListings.length === 0 ? (
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
            // ensure a stable string key — fall back to index if id missing
            keyExtractor={(item, index) => (item && item.id != null ? String(item.id) : String(index))}
            contentContainerStyle={{ paddingBottom: 16 }}
            refreshing={refreshing}
          onRefresh={onRefresh}
          />
        )}
      </View>
      <Modal
        transparent
        visible={isDeleting}
        animationType="fade"
      >
        <View className="flex-1 bg-black/50 ">
            <BlurView intensity={10} className="p-6 w-full h-full flex items-center justify-center">
                <View className="items-center">
                    <ActivityIndicator size="large" color="#60a5fa" />
                    <Text className="text-white font-semibold mt-4">
                        Creating your listing...
                    </Text>
                    <Text className="text-white/80 text-sm mt-2">
                        Uploading images and saving details
                    </Text>
                </View>
            </BlurView>
        </View>
      </Modal>
      {selectedListing && (
        <EditListingSheet
          visible={showEditSheet}
          onClose={() => {
            setShowEditSheet(false)
          }}
          listing={selectedListing}
          user={user}
          setUser={setUser}
        />
      )}
    </SafeAreaView>
  );
}

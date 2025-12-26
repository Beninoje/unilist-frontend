import { fetchAllFavourites, fetchUser, removeFromFavourites } from "@/app/api/profile";
import { Header } from "@/components/navigation/header";
import { useUser } from "@/hooks/context/user-context";
import { Listing } from "@/types/type";
import { getRelativeTime } from "@/utils/listings";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { LoadingFavourites } from "@/components/listings/loader";


export default function Favourites() {
    const [loading, setLoading] = useState(false);
    const { user, updateUser, setSession } = useUser();
    const [myFavourites, setMyFavourites] = useState<Listing[]>([]);

    const fetchAll = async () => {
        try {
            setLoading(true);
            const data = await fetchAllFavourites(user?.token as string);
            setMyFavourites(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const refreshUser = async (token: string) => {
      try {
        const updatedUser = await fetchUser(token); // new API call
        if (!updatedUser) {
          return;
        }
    
        const newUser = {
          ...updatedUser,
          token, 
        };
    
        await updateUser(newUser);
        if (token) await setSession(newUser, token);
      } catch (error) {
        console.log("Error refreshing user:", error);
      }
    };
    const handleRemoveFavourite = async (listingId: any) => {
        const isFav = !!user?.favourites?.includes(listingId);
        
        // setMyFavourites((prev)=> prev.filter((listing) => listing.id !== listingId))
        
        try {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          await removeFromFavourites(listingId, user?.token as string);
          await refreshUser(user?.token as string);
        
        } catch (error) {
          console.log("Error removing favourite:", error);
          fetchAll();
        }
      };

    useEffect(() => {
      if (!user?.favourites || user.favourites.length === 0) {
    setMyFavourites([]); // 🔥 THIS fixes the “last item stays” bug
    return;
  }

        fetchAll();
      
    }, [user?.favourites]);

    const renderItem = ({ item }: { item: Listing }) => {
      const isFav = user?.favourites?.includes(item.id);
      return (
        <TouchableOpacity 
            className="relative w-[48%] mb-4  overflow-hidden col-span-1 mt-4 border border-zinc-200 rounded-xl" 
            onPress={() => router.push({ pathname: '/listing/[id]', params: { id: item.id, listing: JSON.stringify(item) } })}
          >
            <Image 
              source={{ uri:item.images[0]}}  
              className="w-full h-40"
              style={{ width: "100%", height: 150, borderTopLeftRadius:10, borderTopRightRadius:10}}
              contentFit="cover" 
           />
            <TouchableOpacity
              className="absolute top-2 right-2 bg-black/80 rounded-full p-2"
              onPress={(e) => {
                e.stopPropagation();
                handleRemoveFavourite(item.id);
              }}
            >
              <FontAwesome name="heart" size={18} color={`#60a5fa`} />
            </TouchableOpacity>
            <View className="p-2">
              <Text className="font-bold text-lg">CA${item.price}</Text>
              <Text className="text-zinc-800">{item.title}</Text>
              <Text
                  className={`text-sm mt-1 font-semibold ${
                    item.status === "active"
                      ? "text-green-600 bg-green-100 rounded-lg px-1 py-0.5 w-14"
                      : item.status === "sold"
                      ? "text-gray-600"
                      : "text-orange-500"
                  }`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
            </View>

          </TouchableOpacity>
    );
  };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
              <Header user={user} />
              <View style={{ padding: 16, flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
                  My Favourites
                </Text>
                {loading ? (
                  <LoadingFavourites />
                ) : myFavourites.length === 0 ? (
                  <View style={{ alignItems: "center", marginTop: 40 }}>
                    <Feather name="inbox" size={64} color="#ccc" />
                    <Text style={{ fontSize: 18, color: "#666", marginTop: 8 }}>
                      You don't have any favourite listings yet.
                    </Text>
                    <TouchableOpacity className="mt-4 bg-[#60a5fa] py-3 px-5 rounded-xl" onPress={() => {router.push('/(root)/(tabs)/home')}}>
                      <Text className="text-white font-semibold">Add your first favourite</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <FlatList
                    data={myFavourites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10 }}  
                  />
                )}
              </View>
              
              
            </SafeAreaView>
    )
}
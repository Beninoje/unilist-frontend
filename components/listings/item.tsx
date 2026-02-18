import { deleteListing } from "@/app/api/listings";
import { Listing } from "@/types/type";
import { getRelativeTime } from "@/utils/listings";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import React, { useRef } from "react";
import { Alert, Animated, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const Item = ({ item, onSwipe, onEdit, user, setDeleting, setUser, activeSwipeable, setActiveSwipeable }: any) => {
  const localRef = useRef<Swipeable>(null);
  const queryClient = useQueryClient();
  const confirmDelete = () => {
    Alert.alert(
      "Delete Listing",
      "Are you sure you want to delete this listing?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            localRef.current?.close(); 
          },
        },
        { text: "Delete", style: "destructive", onPress: handleDelete },
      ]
    );
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteListing(item.id, user.token);
      
      queryClient.setQueryData<Listing[]>(['userListings', user.token], (old) =>
        old?.filter((l) => l.id !== item.id) ?? []
      );

      localRef.current?.close();
      onSwipe(); 
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setDeleting(false);
    }
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation) => {
  // Delete button grows first
  const deleteScale = progress.interpolate({
    inputRange: [0, 0.3, 0.6, 1],
    outputRange: [0.2, 0.6, 0.9, 1],
    extrapolate: 'clamp',
  });
  const deleteOpacity = progress.interpolate({
    inputRange: [0, 0.3, 0.6, 1],
    outputRange: [0, 0.6, 0.9, 1],
    extrapolate: 'clamp',
  });

  // Edit button grows slightly after delete (stagger)
  const editScale = progress.interpolate({
    inputRange: [0.3, 0.6, 0.9, 1],
    outputRange: [0.1, 0.6, 0.9, 1],
    extrapolate: 'clamp',
  });
  const editOpacity = progress.interpolate({
    inputRange: [0.3, 0.6, 0.9, 1],
    outputRange: [0, 0.6, 0.9, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 8, gap: 12 }}>
      {/* Edit button */}
      {onEdit && (
        <Animated.View style={{ transform: [{ scale: editScale }], opacity: editOpacity, zIndex: 2 }}>
          <TouchableOpacity
            className="w-16 h-16 justify-center items-center bg-blue-400 rounded-2xl"
            onPress={() => {
              localRef.current?.close();
              onEdit();
            }}
          >
            <Feather name="edit-2" size={20} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Delete button */}
      <Animated.View style={{ transform: [{ scale: deleteScale }], opacity: deleteOpacity, zIndex: 2 }}>
        <TouchableOpacity
          className="w-16 h-16 justify-center items-center bg-red-500 rounded-2xl"
          onPress={confirmDelete}
        >
          <Feather name="trash-2" size={20} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};


  return (
    <Swipeable
      ref={localRef}
      onSwipeableWillOpen={() => {
        // ✅ Close previous open swipeable
        if (activeSwipeable && activeSwipeable !== localRef.current) {
          activeSwipeable.close();
        }
        setActiveSwipeable(localRef.current);
      }}
      onSwipeableClose={() => {
        if (activeSwipeable === localRef.current) {
          setActiveSwipeable(null);
        }
      }}
      renderRightActions={renderRightActions}
    >
      <View className="flex-row mb-2 bg-zinc-50 rounded-lg items-center gap-3 border border-zinc-200">
        <Image
          source={{uri: item.images[0]}}
          className="w-20 h-20 rounded-md mr-3"
          style={{ width: 100, height: 100, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
          contentFit="cover"
        />
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="font-semibold text-lg">${item.price}</Text>
            <Text className="text-gray-500 text-xs pr-3">
              {item.createdAt ? getRelativeTime(item.createdAt) : ""}
            </Text>
          </View>
          <Text className="text-base ">{item.title}</Text>
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
      </View>
    </Swipeable>
  );
};

export default Item;

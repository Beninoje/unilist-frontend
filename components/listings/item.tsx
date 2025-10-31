import { deleteListing } from "@/app/api/listings";
import { UserProps } from "@/types/type";
import { getRelativeTime } from "@/utils/listings";
import { Feather } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const Item = ({ item, onSwipe, onEdit, user, setDeleting, setUser, activeSwipeable, setActiveSwipeable }: any) => {
  const localRef = useRef<Swipeable>(null);

  const confirmDelete = () => {
    Alert.alert(
      "Delete Listing",
      "Are you sure you want to delete this listing?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            localRef.current?.close(); // ✅ Close this swipeable when cancelled
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
      setUser((current: any) => {
        if (!current) return current;
        return {
          ...current,
          listings: current.listings.filter((l: any) => l.id !== item.id),
        };
      });
      localRef.current?.close();
      onSwipe(); // notify parent to remove the item
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setDeleting(false);
    }
  };

  const renderRightActions = () => (
    <View className="flex-row mb-2">
      {onEdit && (
        <TouchableOpacity
          className="w-20 justify-center items-center bg-blue-400"
          onPress={() => {
            localRef.current?.close(); // close before editing
            onEdit();
          }}
        >
          <Feather name="edit-2" size={20} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        className="w-20 justify-center items-center bg-red-500"
        onPress={confirmDelete}
      >
        <Feather name="trash-2" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

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
      <View className="flex-row mb-2 bg-white rounded-lg overflow-hidden p-3 items-center">
        <Image
          source={{ uri: item.images[0] }}
          className="w-20 h-20 rounded-md mr-3"
        />
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="font-semibold text-lg">${item.price}</Text>
            <Text className="text-gray-500 text-xs">
              {item.createdAt ? getRelativeTime(item.createdAt) : ""}
            </Text>
          </View>
          <Text className="text-base ">{item.title}</Text>
          <Text
            className={`text-sm mt-1 font-semibold ${
              item.status === "active"
                ? "text-green-600 bg-green-50 rounded-lg px-1 py-0.5 w-14"
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

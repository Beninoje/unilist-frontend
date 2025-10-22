import { Feather } from "@expo/vector-icons";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

interface ListingItemProps {
  item: {
    id: string;
    title: string;
    price: string;
    image: any;
    status: "active" | "sold" | "draft";
  };
  onSwipe: () => void; // called when Delete is pressed
  onEdit?: () => void;  // optional edit callback
}

const Item = ({ item, onSwipe, onEdit }: ListingItemProps) => {
  const handleDelete = () => {
    Alert.alert(
      "Delete Listing",
      "Are you sure you want to delete this listing?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: onSwipe
        }
      ]
    );
  };

  const renderRightActions = () => (
    <View className="flex-row mb-2">
      {onEdit && (
        <TouchableOpacity 
          className="w-20 justify-center items-center bg-blue-400" 
          onPress={onEdit}
        >
          <Feather name="edit-2" size={20} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity 
        className="w-20 justify-center items-center bg-red-500" 
        onPress={handleDelete}
      >
        <Feather name="trash-2" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View className="flex-row bg-white mb-2 rounded-lg overflow-hidden p-3 items-center">
        <Image 
          source={item.image} 
          className="w-20 h-20 rounded-md mr-3"
        />
        <View className="flex-1">
          <Text className="text-base font-bold">{item.title}</Text>
          <Text className="text-green-600 mt-1">{item.price}</Text>
          <Text
            className={`text-sm mt-1 font-semibold ${
              item.status === "active"
                ? "text-green-600"
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

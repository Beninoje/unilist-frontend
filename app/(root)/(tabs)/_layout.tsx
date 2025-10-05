import { Tabs } from "expo-router";
import { View, Image, TouchableOpacity } from "react-native";
import { icons } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const TabIcon = ({
  source,
  focused,
}: {
  source: any;
  focused: boolean;
}) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      height: 26,
      marginTop:20
    }}

  >
    <Image
      source={source}
      style={{
        width: 26,
        height: 26,
        tintColor: focused ? "#60a5fa" : "#9ca3af",
      }}
      resizeMode="contain"
    />
  </View>
);

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { 
          position: "absolute",
          bottom: 20, 
          height: 60,
          backgroundColor: "#1e1e1e", 
          borderRadius: 40, 
          marginHorizontal: 20,
          shadowColor: "#000", 
          shadowOpacity: 0.15, 
          shadowRadius: 10,
          paddingBottom: 0, 
          paddingTop: 0,
          borderTopWidth: 0, // Remove default border
        },
        tabBarItemStyle: {
        },
      }}
    >
      
      {/* Home */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
        
      />

      {/* Search */}
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.search} focused={focused} />
          ),
        }}
      />

<Tabs.Screen
  name="create"
  options={{
    tabBarButton: () => (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          position: "absolute", // Add this
          top: -25, 
          left: "50%", // Add this to center it
          transform: [{ translateX: -35 }], // Add this (half of width: 70/2)
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: "#60a5fa",
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
            shadowColor: "#000", 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}
        >
          <Ionicons name="add" size={36} color="white" />
        </View>
      </TouchableOpacity>
    ),
  }}
/>


      {/* Favourites */}
      <Tabs.Screen
        name="favourites"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.star} focused={focused} />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

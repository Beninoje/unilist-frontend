import { Tabs } from "expo-router";
import { View, Image } from "react-native";
import { AntDesign, Feather, Fontisto, Ionicons, FontAwesome, Octicons} from "@expo/vector-icons";
import React from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Svg, Path } from "react-native-svg";
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
          height: 80,
          backgroundColor: "#f4f4f5",  
          borderTopWidth: 2, 
          borderTopColor: "#e5e7eb", 
          paddingTop: 0,
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
            <Octicons 
              name={focused ? "home-fill" : "home"} 
              size={24} 
              color={focused ? "#60a5fa" : "#9ca3af"}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 26,
                marginTop: 20,
              }} 
            />
            
          ),
        }}
        
      />

      {/* Search */}
     <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 26,
          marginTop: 20,
        }}
      >
        <Svg
          width={26}
          height={26}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path
            d="M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
            stroke={focused ? "#60a5fa" : "#9ca3af"} // outline color
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={focused ? "#60a5fa" : "none"} // 👈 fill when focused
          />
        </Svg>
      </View>
          ),
        }}
      />

      {/* Create */}
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign name="plus" size={24}
            color={focused ? "#60a5fa" : "#9ca3af"}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 26,
              marginTop:20
            }}/>
          ),
        }}
      />
      
      


      {/* Profile */}
      <Tabs.Screen
        name="listings"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
            name={focused ? "ticket" : "ticket-outline"}
              size={26}
              color={focused ? "#60a5fa" : "#9ca3af"}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 26,
                marginTop: 20,
              }}
            />
            
          ),
        }}
      />
      {/* Favourites */}

      <Tabs.Screen
        name="favourites"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name={focused ? "heart" : "heart-o"}
              size={26}
              color={focused ? "#60a5fa" : "#9ca3af"}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 26,
                marginTop: 20,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

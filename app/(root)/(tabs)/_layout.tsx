import { AntDesign, FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform, View } from "react-native";
import { Path, Svg } from "react-native-svg";
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
        tintColor: focused ? "#60a5fa" : "#626262",
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
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 0,
          shadowOffset: { width: 0, height: -1 },
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 2,
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView
              tint="default"
              intensity={50}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'transparent',
              }}
              className="z-[100]"
            />
          ) : null
        ),
        tabBarItemStyle: {
          marginTop: Platform.OS === 'ios' ? 0 : 20,
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
              color={focused ? "#60a5fa" : "#626262"}
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

      {/* Messages */}
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
            stroke={focused ? "#60a5fa" : "#626262"} // outline color
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
            color={focused ? "#60a5fa" : "#626262"}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 26,
              marginTop:20
            }}
            />
          ),
        }}
      />
      
      


      {/* listings */}
      <Tabs.Screen
        name="listings"
        
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
            name={focused ? "ticket" : "ticket-outline"}
              size={26}
              color={focused ? "#60a5fa" : "#626262"}
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
              color={focused ? "#60a5fa" : "#626262"}
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

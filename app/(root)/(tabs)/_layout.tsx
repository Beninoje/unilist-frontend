import { CreateListingSheet } from "@/components/listings/create-listing-sheet";
import { AntDesign, FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Image, Platform, Touchable, TouchableOpacity, View } from "react-native";
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
  const [showCreateModal, setShowCreateModal] = useState(false);
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { 
            position: "absolute",
            height: 80,
            elevation: 0,
            paddingTop: 0,
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
            backgroundColor: "#f4f4f5",
          },
          tabBarBackground: () => (
            // Disable BlurView to avoid desaturating the white background.
            // Return null so the `tabBarStyle.backgroundColor` renders as-is.
            null
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

        <Tabs.Screen
          name="create"
          options={{
            tabBarIcon: () => (
              <AntDesign
                name="plus"
                size={28}
                color="#626262"
                style={{
                 alignItems: "center",
                justifyContent: "center",
                height: 26,
                marginTop:20
                }}
               
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              // Prevent the default navigation to a non-existent route
              e.preventDefault();
              setShowCreateModal(true);
            },
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

      <CreateListingSheet visible={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </>
  );
}

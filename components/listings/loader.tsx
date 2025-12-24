import { useEffect, useRef } from "react";
import { Animated, Easing, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export function LoadingFavourites() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Feather name="loader" size={38} color="#60a5fa" />
      </Animated.View>

      <Text style={{ fontSize: 18, color: "#666", marginTop: 8 }}>
        Loading favourites...
      </Text>
    </View>
  );
}

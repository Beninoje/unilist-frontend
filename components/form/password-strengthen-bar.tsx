import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";

type PasswordStrengthBarProps = {
  password: string;
};

const PasswordStrengthBar = ({ password }: PasswordStrengthBarProps) => {
  const progress = useRef(new Animated.Value(0)).current;


  const strength = Math.min(password.length / 12, 1);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: strength,
      duration: 300, 
      useNativeDriver: false,
    }).start();
  }, [strength]);


  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const color = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#ef4444", "#f59e0b", "#22c55e"], 
  });

  if (password.length < 1) return null;

  return (
    <View className="flex-row items-center gap-3 mt-2">
      <Text className="text-xs text-zinc-500">Password Strength</Text>
      <View className="bg-zinc-200 h-1 w-[150px] rounded-full overflow-hidden">
        <Animated.View
          style={{
            width,
            backgroundColor: color,
            height: 4,
            borderRadius: 9999,
          }}
        />
      </View>
    </View>
  );
};

export default PasswordStrengthBar;

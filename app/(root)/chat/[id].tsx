import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MessageItemProps {
  conversationId: string;
  name: string;
  profileImage: string;
  lastMessage: string;
  date: string;
}

const Chat = () => {
  const { id, message } = useLocalSearchParams<{
    id: string;
    message: string;
  }>();

  const parsedMessage: MessageItemProps | null = message
    ? JSON.parse(message)
    : null;

  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    console.log("Send message:", text);
    setText("");
    // later:
    // sendMessage(id, text)
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-100">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View className="flex-row items-center px-4 py-2 gap-4 border-b border-zinc-200">
              <TouchableOpacity
                className="bg-zinc-200 rounded-full p-2 w-10 h-10 items-center justify-center"
                onPress={router.back}
              >
                <Ionicons name="arrow-back" size={20} color="black" />
              </TouchableOpacity>

              <View className="flex-row items-center gap-3">
                <Image
                  source={{ uri: parsedMessage?.profileImage }}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
                <Text className="text-lg font-semibold">{parsedMessage?.name}</Text>
              </View>
            </View>

            {/* Messages area */}
            <ScrollView className="flex-1 px-4 py-2 gap-3" contentContainerStyle={{ flexGrow: 1, justifyContent: 'start', gap:10 }}>
              {/* User Message */}
              <Text className="self-start max-w-[80%] bg-zinc-600 rounded-r-xl rounded-tl-xl px-4 py-2 text-white">{parsedMessage?.lastMessage}</Text>
              <Text className="self-start max-w-[80%] bg-zinc-600 rounded-r-xl rounded-tl-xl px-4 py-2 text-white">When can I pick it up?</Text>
              <Text className="self-end max-w-[80%] bg-blue-500 rounded-l-xl rounded-tr-xl px-4 py-2 text-white">Yes it is!</Text>
              <Text className="text-zinc-500 text-center mt-4">
                Messages will appear here
              </Text> 
            </ScrollView>
            {/* Input */}
            <View className="flex-row items-center gap-2 px-3 py-2 border-t border-zinc-200 ">
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Type a message..."
                placeholderTextColor="#71717a"
                className="flex-1 bg-zinc-50 rounded-full px-4 py-2 text-base "
              />
              <TouchableOpacity
                onPress={handleSend}
                disabled={!text.trim()}
                className={`rounded-full p-2 ${
                  text.trim() ? "bg-blue-500" : "bg-zinc-300"
                }`}
              >
                <Ionicons name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
};

export default Chat;

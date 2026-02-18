import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { MessageItem } from "@/components/messages/message-item";
import { mockMessages } from "@/constants";
import { router } from "expo-router";
import { Image } from "expo-image";
export default function Messages() {
    return (
        <SafeAreaView className="bg-zinc-100 flex-1">
            <View className="flex-row justify-between items-center px-4 py-2">
                <Text className="text-2xl font-bold">Messages</Text>
                <TouchableOpacity className="bg-zinc-200 rounded-full p-2 w-12 h-12 flex justify-center items-center">
                    <Ionicons name="filter" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View className="w-full px-3 py-2">
                <View className="relative w-full">
                    <Feather name="search" size={20} color="black" className="absolute left-3 top-1/2 -translate-y-1/2 z-10"/>
                    <TextInput
                        placeholder="Search chats..."
                        placeholderTextColor="#9CA3AF"
                        className="bg-gray-50 rounded-2xl pl-10 pr-4 h-14 border border-zinc-200 text-black"
                    />
                </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 px-4 py-2">
                <TouchableOpacity className="bg-zinc-200 rounded-lg py-2 px-4 flex justify-center items-center">
                    <Text>All</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-zinc-200 rounded-lg p-2 flex justify-center items-center">
                    <Text>Read</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-zinc-200 rounded-lg p-2 flex justify-center items-center">
                    <Text>Unread</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                    data={mockMessages}
                    keyExtractor={(item) => item.conversationId.toString()}
                    className="mb-14 pt-0"
                    contentContainerStyle={{flexDirection: "column", justifyContent: "space-between", alignItems: "start", paddingHorizontal: 14}}
                    renderItem={({ item }) => {
                            const time = new Date(item.date).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            });
                        return (
                            <TouchableOpacity 
                                className='py-3 border-b border-zinc-200' 
                                onPress={() => router.push(
                                    { 
                                        pathname: '/chat/[id]', 
                                        params: { id: item.conversationId, message:JSON.stringify(item)} 
                                    })}
                            >
                                <View className='w-full flex-row justify-between items-start'>
                                    <View className='flex-row justify-start items-center gap-4'>
                                        <Image source={{ uri: item.profileImage }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                                        <View>
                                            <Text className='text-lg font-semibold'>{item.name}</Text>
                                            <Text className='text-sm text-zinc-600'>{item.lastMessage}</Text>
                        
                                        </View>
                                    </View>
                                    <View>
                                        <Text className='text-sm font-semibold'>{time}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                    )}}
                    
            />

        </SafeAreaView>
    )
}   
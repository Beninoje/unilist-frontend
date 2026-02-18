import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, Touchable, TouchableOpacity, View } from 'react-native';
type Props = {
    message: MessageItemProps
}
interface MessageItemProps {
    conversationId:string;
    name:string;
    profileImage:string;
    lastMessage:string;
    date:string;
}
export function MessageItem({message}:Props) {
    const time = new Date(message.date).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
});
  return (
    <TouchableOpacity className='py-3 border-b border-zinc-200' onPress={() => router.push({ pathname: '/chat/[id]', params: { id: message.conversationId, message: JSON.stringify(message) } })}>
        <View className='w-full flex-row justify-between items-start'>
            <View className='flex-row justify-start items-center gap-4'>
                <Image source={{ uri: message.profileImage }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                <View>
                    <Text className='text-lg font-semibold'>{message.name}</Text>
                    <Text className='text-sm text-zinc-600'>{message.lastMessage}</Text>

                </View>
            </View>
            <View>
                <Text className='text-sm font-semibold'>{time}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
}
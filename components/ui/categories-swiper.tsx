import { images, popularCategories } from "@/constants"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"

export const CategoriesSwiper = () => {
    return (
        <View className="mt-4">
          <Text className="text-2xl font-bold mb-2">Popular Categories</Text>
          <FlatList
            data={popularCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 4 }}
            className="mt-4"
            renderItem={({ item }) => (
                <TouchableOpacity className="mr-2 rounded-xl overflow-hidden shadow-md relative">
                    <Image
                        source={images[item.imageKey]}
                        className="w-44 h-24"
                    />
                    <View className="absolute bottom-0 left-0 right-0 bg-black/30 py-1 w-full h-full flex justify-center items-center">
                        <Text className="text-white font-semibold text-center uppercase">{item.name}</Text>
                    </View>
                </TouchableOpacity>

            )}
          />
        </View>
    )
}
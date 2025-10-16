import { UserProvider } from "@/hooks/context/user-context";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <UserProvider>
      <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
};

export default Layout;

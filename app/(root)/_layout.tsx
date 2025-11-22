import { UserProvider } from "@/hooks/context/user-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const Layout = () => {
  const queryClient = new QueryClient();

  return (
     <QueryClientProvider client={queryClient}>
      <UserProvider>  
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="listing" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Layout;



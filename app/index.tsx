// app/index.tsx
import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { getSession } from "@/utils/auth";

SplashScreen.preventAutoHideAsync(); // keep splash visible until we're ready

export default function Index() {
  const [session, setSession] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        const s = await getSession(); // check cache
        setSession(s);
      } catch (err) {
        console.error("Session check failed:", err);
      } finally {
        setReady(true);
        await SplashScreen.hideAsync(); 
      }
    };
    prepare();
  }, []);

  if (!ready) {
    return null;
  }

  if (session) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}

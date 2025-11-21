import { UserProps } from "@/types/type";
import { getSession } from "@/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  loading: boolean;
  setSession: (user: UserProps, token: string) => Promise<void>;
  updateUser: (user: Partial<UserProps> | UserProps) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  const setSession = async (user: UserProps, token: string) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      if (token) await AsyncStorage.setItem("jwt", token);
      setUser(user);
    } catch (error) {
      console.log("Error setting session:", error);
    }
  };
  
  const updateUser = async (updated: Partial<UserProps> | UserProps) => {
    try {
      setUser((prev) => {
        const merged = { ...(prev as UserProps || {}), ...((updated as UserProps) || {}) } as UserProps;
        AsyncStorage.setItem("user", JSON.stringify(merged)).catch((e) =>
          console.warn('Failed to persist updated user:', e)
        );
        return merged;
      });
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };


  useEffect(() => {
    const loadUser = async () => {
      const session = await getSession();

      if (!session || !session.token) {
        router.replace("/(auth)/sign-up");
        return;
      }

      setUser({ ...session.user, token: session.token });
      setLoading(false);
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setSession, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

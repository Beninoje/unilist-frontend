import { addToFavourites, removeFromFavourites } from "@/app/api/profile";
import { UserProps } from "@/types/type";
import { getSession } from "@/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
interface UserContextType {
  user: UserProps | null;
  favourites: string[];
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  loading: boolean;
  setSession: (user: UserProps, token: string) => Promise<void>;
  updateUser: (user: Partial<UserProps> | UserProps) => Promise<void>;
  toggleFavourite: (listingId: string) => Promise<void>;
  isFavourite: (listingId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  const favourites = user?.favourites ?? [];

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
    return new Promise<void>((resolve) => {
      setUser(prev => {
        const merged = { ...(prev ?? {}), ...updated } as UserProps;
        AsyncStorage.setItem("user", JSON.stringify(merged)).catch(console.warn);
        return merged;
      });
      resolve();
    });
  };


  const isFavourite = (listingId: string) => user?.favourites?.includes(listingId) ?? false;

  const toggleFavourite = async (listingId: string) => {
  if (!user?.token) return;

  const token = user.token;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  
  // Determine current state BEFORE optimistic update
  const isFav = user.favourites?.includes(listingId) ?? false;
  const newFavourites = isFav
    ? user.favourites!.filter(id => id !== listingId)
    : [...(user.favourites ?? []), listingId];

  // Optimistic update
  setUser(prev => {
    if (!prev) return prev;
    const updated = { ...prev, favourites: newFavourites };
    AsyncStorage.setItem("user", JSON.stringify(updated)).catch(console.warn);
    return updated;
  });

  try {
    // Use the pre-calculated isFav value
    if (isFav) {
      await removeFromFavourites(listingId, token);
    } else {
      await addToFavourites(listingId, token);
    }
  } catch (err) {
    console.error("Failed to sync favourites:", err);
    // Rollback on error
    const originalFavourites = user.favourites ?? [];
    setUser(prev => {
      if (!prev) return prev;
      const reverted = { ...prev, favourites: originalFavourites };
      AsyncStorage.setItem("user", JSON.stringify(reverted)).catch(console.warn);
      return reverted;
    });
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
    <UserContext.Provider
      value={{ 
        user, 
        favourites, 
        setUser, 
        loading, 
        setSession, 
        updateUser,
        toggleFavourite,
        isFavourite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

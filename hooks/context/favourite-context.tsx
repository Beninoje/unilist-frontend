import React, { createContext, useContext, useState, useEffect } from "react";
import { addToFavourites, removeFromFavourites } from "@/app/api/profile";
import * as Haptics from "expo-haptics";
import { useUser } from "./user-context";
import { Listing } from "@/types/type";

type FavouritesContextType = {
  favourites: string[];
  isFavourite: (id: string) => boolean;
  toggleFavourite: (id: string) => Promise<void>;
};

const FavouritesContext = createContext<FavouritesContextType | null>(null);

export const FavouritesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    setFavourites(user.favourites ?? []);
  }, [user?.id]); 
  const isFavourite = (id: string) => favourites.includes(id);
  console.log("Context favourites:", favourites);

  const toggleFavourite = async (id: string) => {
    if (!user?.token) return;

    const isFav = favourites.includes(id);

    setFavourites(prev =>
      isFav ? prev.filter(favId => favId !== id) : [...prev, id]
    );

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      if (isFav) {
        await removeFromFavourites(id, user.token);
      } else {
        await addToFavourites(id, user.token);
      }
    } catch (error) {
      console.log("Favourite toggle failed:", error);

      // rollback on failure
      setFavourites(prev =>
        isFav ? [...prev, id] : prev.filter(favId => favId !== id)
      );
    }
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, isFavourite, toggleFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const ctx = useContext(FavouritesContext);
  if (!ctx) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }
  return ctx;
};

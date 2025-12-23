import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

const FavoriteContext = createContext();

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorite = (food) => {
    const isAlreadyFavorite = favorites.some((item) => item.id === food.id);

    if (!isAlreadyFavorite) {
      const foodWithSlug = {
        ...food,
        slug: food.slug || food.name.toLowerCase().replace(/\s+/g, "-"),
      };
      setFavorites((prev) => [...prev, foodWithSlug]);
      toast.success(`${food.name} added to favorites!`);
      return true;
    } else {
      toast.error(`${food.name} is already in favorites.`);
    }
    return false;
  };

  const removeFromFavorite = (id) => {
    const removedItem = favorites.find((item) => item.id === id);
    if (removedItem) {
      setFavorites((prev) => prev.filter((item) => item.id !== id));
      toast.success(`${removedItem.name} removed from favorites.`);
    } else {
      toast.error("Item not found in favorites.");
    }
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast.success("All favorites cleared.");
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addToFavorite,
        removeFromFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

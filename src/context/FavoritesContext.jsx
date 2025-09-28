import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const FavoritesContext = createContext();

// Provider component
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when app starts
  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) setFavorites(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to parse favorites from localStorage", err);
    }
  }, []);

  // Toggle a launch in favorites
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((x) => x !== id)  // Remove from favorites
        : [...prev, id];               // Add to favorites

      try {
        localStorage.setItem("favorites", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save favorites to localStorage", err);
      }

      return updated;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook for consuming the context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

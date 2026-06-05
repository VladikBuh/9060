import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  cloudExplLoadFavorites,
  cloudExplSaveFavorites,
} from '../cloudExplStrg/CloudExplFavoritesStorage';

type CloudExplFavoritesState = {
  favoriteIds: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  clearAllFavorites: () => void;
  reloadFavorites: () => Promise<void>;
};

const cloudExplFavoritesContext =
  createContext<CloudExplFavoritesState | null>(null);

export function CloudExplFavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const reloadFavorites = useCallback(async () => {
    const loaded = await cloudExplLoadFavorites();
    setFavoriteIds(loaded);
  }, []);

  useEffect(() => {
    void reloadFavorites();
  }, [reloadFavorites]);

  const toggleFavorite = useCallback((itemId: string) => {
    setFavoriteIds(prev => {
      const next = prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];
      void cloudExplSaveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (itemId: string) => favoriteIds.includes(itemId),
    [favoriteIds],
  );

  const clearAllFavorites = useCallback(() => {
    setFavoriteIds([]);
    void cloudExplSaveFavorites([]);
  }, []);

  const value = useMemo<CloudExplFavoritesState>(
    () => ({
      favoriteIds,
      toggleFavorite,
      isFavorite,
      clearAllFavorites,
      reloadFavorites,
    }),
    [favoriteIds, toggleFavorite, isFavorite, clearAllFavorites, reloadFavorites],
  );

  return (
    <cloudExplFavoritesContext.Provider value={value}>
      {children}
    </cloudExplFavoritesContext.Provider>
  );
}

export function useCloudExplFavorites() {
  const context = useContext(cloudExplFavoritesContext);
  if (!context) {
    throw new Error(
      'useCloudExplFavorites must be used within CloudExplFavoritesProvider',
    );
  }
  return context;
}

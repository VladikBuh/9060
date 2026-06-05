import AsyncStorage from '@react-native-async-storage/async-storage';

const cloudExplFavoritesKey = 'cloudexpl:favorites';

export const cloudExplLoadFavorites = async (): Promise<string[]> => {
  const raw = await AsyncStorage.getItem(cloudExplFavoritesKey);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
};

export const cloudExplSaveFavorites = async (favoriteIds: string[]) => {
  await AsyncStorage.setItem(cloudExplFavoritesKey, JSON.stringify(favoriteIds));
};

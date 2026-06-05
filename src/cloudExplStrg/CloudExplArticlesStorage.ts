import AsyncStorage from '@react-native-async-storage/async-storage';

const cloudExplReadArticlesKey = 'cloudexpl:read-articles';

export const cloudExplLoadReadArticles = async (): Promise<string[]> => {
  const raw = await AsyncStorage.getItem(cloudExplReadArticlesKey);
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

export const cloudExplSaveReadArticles = async (readIds: string[]) => {
  await AsyncStorage.setItem(cloudExplReadArticlesKey, JSON.stringify(readIds));
};


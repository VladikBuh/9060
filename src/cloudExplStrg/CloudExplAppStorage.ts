import AsyncStorage from '@react-native-async-storage/async-storage';

const cloudExplOnboardingKey = 'cloudexpl:onboarding-done';
const cloudExplVibrationKey = 'cloudexpl:vibration-enabled';

export const cloudExplLoadOnboardingDone = async (): Promise<boolean> => {
  const raw = await AsyncStorage.getItem(cloudExplOnboardingKey);
  return raw === 'true';
};

export const cloudExplSaveOnboardingDone = async (done: boolean) => {
  await AsyncStorage.setItem(cloudExplOnboardingKey, done ? 'true' : 'false');
};

export const cloudExplLoadVibrationEnabled = async (): Promise<boolean> => {
  const raw = await AsyncStorage.getItem(cloudExplVibrationKey);
  if (raw === null) {
    return false;
  }
  return raw === 'true';
};

export const cloudExplSaveVibrationEnabled = async (enabled: boolean) => {
  await AsyncStorage.setItem(
    cloudExplVibrationKey,
    enabled ? 'true' : 'false',
  );
};

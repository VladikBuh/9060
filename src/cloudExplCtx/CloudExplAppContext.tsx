import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  cloudExplLoadVibrationEnabled,
  cloudExplSaveVibrationEnabled,
} from '../cloudExplStrg/CloudExplAppStorage';
import {cloudExplVibrateQuizCorrect} from '../cloudExplUtil/CloudExplVibration';

type CloudExplAppState = {
  onboardingDone: boolean;
  setOnboardingDone: (value: boolean) => void;
  vibrationEnabled: boolean;
  setVibrationEnabled: (value: boolean) => void;
};

const cloudExplAppContext = createContext<CloudExplAppState | null>(null);

export function CloudExplAppProvider({children}: {children: React.ReactNode}) {
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [vibrationEnabled, setVibrationEnabledState] = useState(false);

  useEffect(() => {
    void cloudExplLoadVibrationEnabled().then(setVibrationEnabledState);
  }, []);

  const setVibrationEnabled = useCallback((value: boolean) => {
    setVibrationEnabledState(value);
    void cloudExplSaveVibrationEnabled(value);
    if (value) {
      cloudExplVibrateQuizCorrect();
    }
  }, []);

  const value = useMemo<CloudExplAppState>(
    () => ({
      onboardingDone,
      setOnboardingDone,
      vibrationEnabled,
      setVibrationEnabled,
    }),
    [onboardingDone, vibrationEnabled, setVibrationEnabled],
  );

  return (
    <cloudExplAppContext.Provider value={value}>
      {children}
    </cloudExplAppContext.Provider>
  );
}

export function useCloudExplApp() {
  const context = useContext(cloudExplAppContext);
  if (!context) {
    throw new Error('useCloudExplApp must be used within CloudExplAppProvider');
  }
  return context;
}

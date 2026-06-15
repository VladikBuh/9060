import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {CloudExplArticleDetailScreen} from '../cloudExplScrn/CloudExplArticleDetailScreen/CloudExplArticleDetailScreen';
import {CloudExplMapLocationScreen} from '../cloudExplScrn/CloudExplMapLocationScreen/CloudExplMapLocationScreen';
import {CloudExplOnboardingScreen} from '../cloudExplScrn/CloudExplOnboardingScreen/CloudExplOnboardingScreen';
import {CloudExplSplashScreen} from '../cloudExplScrn/CloudExplSplashScreen/CloudExplSplashScreen';
import {cloudExplBindNavigation} from './CloudExplRootNavigation';
import {CloudExplMainTabs} from './CloudExplMainTabs';
import type {
  CloudExplMainTabParamList,
  CloudExplRootStackParamList,
} from './CloudExplTypes';

type CloudExplStackRoute = {
  [RouteName in keyof CloudExplRootStackParamList]: undefined extends CloudExplRootStackParamList[RouteName]
    ? {name: RouteName; params?: undefined}
    : {name: RouteName; params: CloudExplRootStackParamList[RouteName]};
}[keyof CloudExplRootStackParamList];

type CloudExplNavigationState = {
  stack: CloudExplStackRoute[];
  activeTab: keyof CloudExplMainTabParamList;
  mountedTabs: Set<keyof CloudExplMainTabParamList>;
  currentRoute: CloudExplStackRoute;
  isTabFocused: (tab: keyof CloudExplMainTabParamList) => boolean;
  navigateRootScreen: <RouteName extends keyof CloudExplRootStackParamList>(
    screen: RouteName,
    params?: CloudExplRootStackParamList[RouteName],
  ) => void;
  replaceRootScreen: <RouteName extends keyof CloudExplRootStackParamList>(
    screen: RouteName,
    params?: CloudExplRootStackParamList[RouteName],
  ) => void;
  goBack: () => void;
  resetToMain: () => void;
  setActiveTab: (tab: keyof CloudExplMainTabParamList) => void;
};

const cloudExplNavigationContext =
  createContext<CloudExplNavigationState | null>(null);

function cloudExplMakeStackRoute<
  RouteName extends keyof CloudExplRootStackParamList,
>(
  screen: RouteName,
  params?: CloudExplRootStackParamList[RouteName],
): CloudExplStackRoute {
  return {name: screen, params} as CloudExplStackRoute;
}

function CloudExplStackScreen({route}: {route: CloudExplStackRoute}) {
  switch (route.name) {
    case 'Splash':
      return <CloudExplSplashScreen />;
    case 'Onboarding':
      return <CloudExplOnboardingScreen />;
    case 'Main':
      return <CloudExplMainTabs />;
    case 'ArticleDetail':
      return <CloudExplArticleDetailScreen />;
    case 'MapLocation':
      return <CloudExplMapLocationScreen />;
    default:
      return null;
  }
}

export function CloudExplNavigationProvider() {
  const [stack, setStack] = useState<CloudExplStackRoute[]>([
    cloudExplMakeStackRoute('Splash'),
  ]);
  const [activeTab, setActiveTabState] =
    useState<keyof CloudExplMainTabParamList>('Articles');
  const [mountedTabs, setMountedTabs] = useState<
    Set<keyof CloudExplMainTabParamList>
  >(() => new Set(['Articles']));

  const currentRoute = stack[stack.length - 1];

  const navigateRootScreen = useCallback(
    <RouteName extends keyof CloudExplRootStackParamList>(
      screen: RouteName,
      params?: CloudExplRootStackParamList[RouteName],
    ) => {
      setStack(prev => [...prev, cloudExplMakeStackRoute(screen, params)]);
    },
    [],
  );

  const replaceRootScreen = useCallback(
    <RouteName extends keyof CloudExplRootStackParamList>(
      screen: RouteName,
      params?: CloudExplRootStackParamList[RouteName],
    ) => {
      setStack(prev => [
        ...prev.slice(0, -1),
        cloudExplMakeStackRoute(screen, params),
      ]);
    },
    [],
  );

  const goBack = useCallback(() => {
    setStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const resetToMain = useCallback(() => {
    setStack([cloudExplMakeStackRoute('Main')]);
  }, []);

  const setActiveTab = useCallback((tab: keyof CloudExplMainTabParamList) => {
    setActiveTabState(tab);
    setMountedTabs(prev => new Set(prev).add(tab));
  }, []);

  const isTabFocused = useCallback(
    (tab: keyof CloudExplMainTabParamList) => activeTab === tab,
    [activeTab],
  );

  const value = useMemo<CloudExplNavigationState>(
    () => ({
      stack,
      activeTab,
      mountedTabs,
      currentRoute,
      isTabFocused,
      navigateRootScreen,
      replaceRootScreen,
      goBack,
      resetToMain,
      setActiveTab,
    }),
    [
      stack,
      activeTab,
      mountedTabs,
      currentRoute,
      isTabFocused,
      navigateRootScreen,
      replaceRootScreen,
      goBack,
      resetToMain,
      setActiveTab,
    ],
  );

  useEffect(() => {
    cloudExplBindNavigation({
      navigateRootScreen,
      replaceRootScreen,
      goBack,
      resetToMain,
      setActiveTab,
    });

    return () => {
      cloudExplBindNavigation(null);
    };
  }, [
    navigateRootScreen,
    replaceRootScreen,
    goBack,
    resetToMain,
    setActiveTab,
  ]);

  return (
    <cloudExplNavigationContext.Provider value={value}>
      <View style={styles.cloudExplRoot}>
        <CloudExplStackScreen route={currentRoute} />
      </View>
    </cloudExplNavigationContext.Provider>
  );
}

export function useCloudExplNavigation() {
  const context = useContext(cloudExplNavigationContext);
  if (!context) {
    throw new Error(
      'useCloudExplNavigation must be used within CloudExplNavigationProvider',
    );
  }
  return context;
}

export function useCloudExplStackParams<
  RouteName extends keyof CloudExplRootStackParamList,
>(routeName: RouteName): CloudExplRootStackParamList[RouteName] {
  const {currentRoute} = useCloudExplNavigation();
  if (currentRoute.name !== routeName) {
    throw new Error(
      `Expected route "${String(routeName)}", got "${String(currentRoute.name)}"`,
    );
  }
  return currentRoute.params as CloudExplRootStackParamList[RouteName];
}

export function useCloudExplTabFocus(
  tab: keyof CloudExplMainTabParamList,
  onFocus: () => void,
  onBlur?: () => void,
) {
  const {isTabFocused} = useCloudExplNavigation();
  const focused = isTabFocused(tab);

  useEffect(() => {
    if (!focused) {
      return undefined;
    }

    onFocus();
    return () => {
      onBlur?.();
    };
  }, [focused, onFocus, onBlur]);
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

import type {
  CloudExplMainTabParamList,
  CloudExplRootStackParamList,
} from './CloudExplTypes';

type CloudExplNavigationHandle = {
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

let cloudExplNavigationHandle: CloudExplNavigationHandle | null = null;

export function cloudExplBindNavigation(
  handle: CloudExplNavigationHandle | null,
) {
  cloudExplNavigationHandle = handle;
}

export function cloudExplNavigateRootScreen<
  RouteName extends keyof CloudExplRootStackParamList,
>(
  screen: RouteName,
  params?: CloudExplRootStackParamList[RouteName],
) {
  cloudExplNavigationHandle?.navigateRootScreen(screen, params);
}

export function cloudExplReplaceRootScreen<
  RouteName extends keyof CloudExplRootStackParamList,
>(
  screen: RouteName,
  params?: CloudExplRootStackParamList[RouteName],
) {
  cloudExplNavigationHandle?.replaceRootScreen(screen, params);
}

export function cloudExplGoBack() {
  cloudExplNavigationHandle?.goBack();
}

export function cloudExplResetToMain() {
  cloudExplNavigationHandle?.resetToMain();
}

export function cloudExplNavigateTab(tab: keyof CloudExplMainTabParamList) {
  cloudExplNavigationHandle?.setActiveTab(tab);
}

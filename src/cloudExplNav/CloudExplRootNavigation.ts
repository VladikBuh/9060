import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import type {CloudExplRootStackParamList} from './CloudExplTypes';

export const cloudExplNavigationRef =
  createNavigationContainerRef<CloudExplRootStackParamList>();

export function cloudExplNavigateRootScreen<
  RouteName extends keyof CloudExplRootStackParamList,
>(
  screen: RouteName,
  params?: CloudExplRootStackParamList[RouteName],
) {
  if (!cloudExplNavigationRef.isReady()) {
    return;
  }

  cloudExplNavigationRef.navigate(screen as never, params as never);
}

export function cloudExplReplaceRootScreen<
  RouteName extends keyof CloudExplRootStackParamList,
>(
  screen: RouteName,
  params?: CloudExplRootStackParamList[RouteName],
) {
  if (!cloudExplNavigationRef.isReady()) {
    return;
  }

  cloudExplNavigationRef.dispatch(
    StackActions.replace(screen, params),
  );
}

export function cloudExplResetToMain() {
  if (!cloudExplNavigationRef.isReady()) {
    return;
  }

  cloudExplNavigationRef.reset({
    index: 0,
    routes: [{name: 'Main'}],
  });
}

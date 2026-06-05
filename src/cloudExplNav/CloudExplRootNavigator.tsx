import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CloudExplAppProvider} from '../cloudExplCtx/CloudExplAppContext';
import {CloudExplArticlesProvider} from '../cloudExplCtx/CloudExplArticlesContext';
import {CloudExplFavoritesProvider} from '../cloudExplCtx/CloudExplFavoritesContext';
import {CloudExplArticleDetailScreen} from '../cloudExplScrn/CloudExplArticleDetailScreen';
import {CloudExplMapLocationScreen} from '../cloudExplScrn/CloudExplMapLocationScreen';
import {CloudExplOnboardingScreen} from '../cloudExplScrn/CloudExplOnboardingScreen';
import {CloudExplSplashScreen} from '../cloudExplScrn/CloudExplSplashScreen';
import {cloudExplColors} from '../cloudExplThm/CloudExplTheme';
import {CloudExplMainTabs} from './CloudExplMainTabs';
import {cloudExplNavigationRef} from './CloudExplRootNavigation';
import {CloudExplRootStackParamList} from './CloudExplTypes';

const CloudExplStack = createStackNavigator<CloudExplRootStackParamList>();

const cloudExplNavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: cloudExplColors.background,
    card: cloudExplColors.background,
    text: cloudExplColors.text,
    border: 'transparent',
    notification: cloudExplColors.accent,
  },
};

export function CloudExplRootNavigator() {
  return (
    <CloudExplAppProvider>
      <CloudExplFavoritesProvider>
        <CloudExplArticlesProvider>
          <NavigationContainer
            ref={cloudExplNavigationRef}
            theme={cloudExplNavTheme}>
            <CloudExplStack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                cardStyle: {backgroundColor: 'transparent'},
              }}>
              <CloudExplStack.Screen
                name="Splash"
                component={CloudExplSplashScreen}
              />
              <CloudExplStack.Screen
                name="Onboarding"
                component={CloudExplOnboardingScreen}
              />
              <CloudExplStack.Screen name="Main" component={CloudExplMainTabs} />
              <CloudExplStack.Screen
                name="ArticleDetail"
                component={CloudExplArticleDetailScreen}
              />
              <CloudExplStack.Screen
                name="MapLocation"
                component={CloudExplMapLocationScreen}
              />
            </CloudExplStack.Navigator>
          </NavigationContainer>
        </CloudExplArticlesProvider>
      </CloudExplFavoritesProvider>
    </CloudExplAppProvider>
  );
}

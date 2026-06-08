import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {cloudExplImages} from '../cloudExplAssts';
import {CloudExplArticlesScreen} from '../cloudExplScrn/CloudExplArticlesScreen';
import {CloudExplFavoritesScreen} from '../cloudExplScrn/CloudExplFavoritesScreen';
import {CloudExplMapScreen} from '../cloudExplScrn/CloudExplMapScreen';
import {CloudExplQuizScreen} from '../cloudExplScrn/CloudExplQuizScreen';
import {CloudExplSettingsScreen} from '../cloudExplScrn/CloudExplSettingsScreen';
import {CloudExplTimelineScreen} from '../cloudExplScrn/CloudExplTimelineScreen';
import {CloudExplMainTabParamList} from './CloudExplTypes';

const cloudExplTab = createBottomTabNavigator<CloudExplMainTabParamList>();

const cloudExplMakeTabIcon =
  (source: number) =>
  ({focused}: {focused: boolean}) =>
    (
      <Image
        source={source}
        style={[
          styles.cloudExplIcon,
          {
            tintColor: focused ? '#4B66FF' : 'rgba(234, 244, 255, 0.62)',
          },
        ]}
        resizeMode="contain"
      />
    );

function CloudExplAnimatedTabButton(props: Record<string, unknown>) {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={() => {
        Animated.spring(scale, {
          toValue: 0.88,
          useNativeDriver: true,
          speed: 50,
          bounciness: 4,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 8,
        }).start();
      }}
      style={[style as ViewStyle, styles.cloudExplTabButton]}
      {...rest}>
      <Animated.View
        style={[styles.cloudExplTabButtonInner, {transform: [{scale}]}]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
}

function CloudExplTabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.cloudExplTabBarBg} />
      <View style={styles.cloudExplTabBarTopBorder} />
    </View>
  );
}

export function CloudExplMainTabs() {
  return (
    <cloudExplTab.Navigator
      initialRouteName="Articles"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.cloudExplTabBar,
        tabBarBackground: CloudExplTabBarBackground,
        tabBarButton: props => <CloudExplAnimatedTabButton {...props} />,
      }}>
      <cloudExplTab.Screen
        name="Articles"
        component={CloudExplArticlesScreen}
        options={{
          tabBarIcon: cloudExplMakeTabIcon(cloudExplImages.tabArticles),
        }}
      />
      <cloudExplTab.Screen
        name="Map"
        component={CloudExplMapScreen}
        options={{
          tabBarIcon: cloudExplMakeTabIcon(cloudExplImages.tabMap),
          lazy: true,
        }}
      />
      <cloudExplTab.Screen
        name="Quiz"
        component={CloudExplQuizScreen}
        options={{
          tabBarIcon: cloudExplMakeTabIcon(cloudExplImages.tabQuiz),
        }}
      />
      <cloudExplTab.Screen
        name="Timeline"
        component={CloudExplTimelineScreen}
        options={{
          tabBarIcon: cloudExplMakeTabIcon(cloudExplImages.tabTimeline),
        }}
      />
      <cloudExplTab.Screen
        name="Favorites"
        component={CloudExplFavoritesScreen}
        options={{
          tabBarIcon: cloudExplMakeTabIcon(cloudExplImages.tabFavorites),
        }}
      />
      <cloudExplTab.Screen
        name="Settings"
        component={CloudExplSettingsScreen}
        options={{
          tabBarIcon: cloudExplMakeTabIcon(cloudExplImages.tabSettings),
        }}
      />
    </cloudExplTab.Navigator>
  );
}

const styles = StyleSheet.create({
  cloudExplIcon: {
    width: 22,
    height: 22,
  },
  cloudExplTabBar: {
    elevation: 0,
    backgroundColor: 'transparent',
    height: 75,
    paddingTop: 2,
    paddingBottom: 13,
    paddingHorizontal: 14,
    borderTopWidth: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  cloudExplTabBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#5E93D4',
  },
  cloudExplTabBarTopBorder: {
    height: 1.5,
    backgroundColor: 'rgba(234, 244, 255, 0.16)',
  },
  cloudExplTabButton: {flex: 1},
  cloudExplTabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

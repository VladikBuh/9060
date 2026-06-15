import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import {cloudExplImages} from '../cloudExplAssts';
import {CloudExplArticlesScreen} from '../cloudExplScrn/CloudExplArticlesScreen/CloudExplArticlesScreen';
import {CloudExplFavoritesScreen} from '../cloudExplScrn/CloudExplFavoritesScreen/CloudExplFavoritesScreen';
import {CloudExplMapScreen} from '../cloudExplScrn/CloudExplMapScreen/CloudExplMapScreen';
import {CloudExplQuizScreen} from '../cloudExplScrn/CloudExplQuizScreen/CloudExplQuizScreen';
import {CloudExplSettingsScreen} from '../cloudExplScrn/CloudExplSettingsScreen/CloudExplSettingsScreen';
import {CloudExplTimelineScreen} from '../cloudExplScrn/CloudExplTimelineScreen/CloudExplTimelineScreen';
import {useCloudExplNavigation} from './CloudExplNavigationContext';
import type {CloudExplMainTabParamList} from './CloudExplTypes';

type CloudExplTabConfig = {
  name: keyof CloudExplMainTabParamList;
  icon: number;
  lazy?: boolean;
  component: React.ComponentType;
};

const cloudExplTabs: CloudExplTabConfig[] = [
  {
    name: 'Articles',
    icon: cloudExplImages.tabArticles,
    component: CloudExplArticlesScreen,
  },
  {
    name: 'Map',
    icon: cloudExplImages.tabMap,
    lazy: true,
    component: CloudExplMapScreen,
  },
  {
    name: 'Quiz',
    icon: cloudExplImages.tabQuiz,
    component: CloudExplQuizScreen,
  },
  {
    name: 'Timeline',
    icon: cloudExplImages.tabTimeline,
    component: CloudExplTimelineScreen,
  },
  {
    name: 'Favorites',
    icon: cloudExplImages.tabFavorites,
    component: CloudExplFavoritesScreen,
  },
  {
    name: 'Settings',
    icon: cloudExplImages.tabSettings,
    component: CloudExplSettingsScreen,
  },
];

function CloudExplAnimatedTabButton({
  onPress,
  style,
  children,
}: {
  onPress: () => void;
  style?: ViewStyle;
  children: React.ReactNode;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPress={onPress}
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
      style={[style, styles.cloudExplTabButton]}>
      <Animated.View
        style={[styles.cloudExplTabButtonInner, {transform: [{scale}]}]}>
        {children}
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
  const {activeTab, mountedTabs, setActiveTab} = useCloudExplNavigation();

  return (
    <View style={styles.cloudExplRoot}>
      {cloudExplTabs.map(tab => {
        const shouldMount = !tab.lazy || mountedTabs.has(tab.name);
        const focused = activeTab === tab.name;
        const TabComponent = tab.component;

        if (!shouldMount) {
          return null;
        }

        return (
          <View
            key={tab.name}
            style={[styles.cloudExplScreen, !focused && styles.cloudExplScreenHidden]}
            pointerEvents={focused ? 'auto' : 'none'}>
            <TabComponent />
          </View>
        );
      })}

      <View style={styles.cloudExplTabBar}>
        <CloudExplTabBarBackground />
        {cloudExplTabs.map(tab => {
          const focused = activeTab === tab.name;
          return (
            <CloudExplAnimatedTabButton
              key={tab.name}
              onPress={() => setActiveTab(tab.name)}
              style={styles.cloudExplTabButtonSlot}>
              <Image
                source={tab.icon}
                style={[
                  styles.cloudExplIcon,
                  {
                    tintColor: focused
                      ? '#4B66FF'
                      : 'rgba(234, 244, 255, 0.62)',
                  },
                ]}
                resizeMode="contain"
              />
            </CloudExplAnimatedTabButton>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
  },
  cloudExplScreen: {
    ...StyleSheet.absoluteFillObject,
  },
  cloudExplScreenHidden: {
    opacity: 0,
  },
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
    flexDirection: 'row',
    alignItems: 'center',
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
  cloudExplTabButtonSlot: {flex: 1},
  cloudExplTabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

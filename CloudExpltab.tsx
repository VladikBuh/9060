import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import CloudExplmap from './CloudExpl/CloudExplscrn/CloudExplmap';
import CloudExplexplr from './CloudExpl/CloudExplscrn/CloudExplexplr';
import CloudExplsaved from './CloudExpl/CloudExplscrn/CloudExplsaved';
import CloudExplsttgs from './CloudExpl/CloudExplscrn/CloudExplsttgs';

const Tab = createBottomTabNavigator();

const cloudExplActiveColor = '#4A9EFF';
const cloudExplIdleColor = '#5A6A82';

const cloudExplMakeTabIcon =
  (cloudExplLabel: string) =>
  ({focused}: {focused: boolean}) =>
    (
      <View style={styles.cloudExplTabItem}>
        <Text
          style={[
            styles.cloudExplTabLabel,
            {color: focused ? cloudExplActiveColor : cloudExplIdleColor},
          ]}>
          {cloudExplLabel}
        </Text>
      </View>
    );

const CloudExplTabBarBackground = () => (
  <View style={StyleSheet.absoluteFill}>
    <LinearGradient
      colors={['#0A0F1AF2', '#0A0F1AF2']}
      style={StyleSheet.absoluteFill}
    />
    <View style={styles.cloudExplTabBarTopBorder} />
  </View>
);

const CloudExpltab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.cloudExplTabBar,
        tabBarBackground: CloudExplTabBarBackground,
      }}>
      <Tab.Screen
        name="CloudExplmap"
        component={CloudExplmap}
        options={{
          tabBarIcon: cloudExplMakeTabIcon('Map'),
        }}
      />
      <Tab.Screen
        name="CloudExplexplr"
        component={CloudExplexplr}
        options={{
          tabBarIcon: cloudExplMakeTabIcon('Explore'),
        }}
      />
      <Tab.Screen
        name="CloudExplsaved"
        component={CloudExplsaved}
        options={{
          tabBarIcon: cloudExplMakeTabIcon('Saved'),
        }}
      />
      <Tab.Screen
        name="CloudExplsttgs"
        component={CloudExplsttgs}
        options={{
          tabBarIcon: cloudExplMakeTabIcon('Settings'),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  cloudExplTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
  },
  cloudExplTabLabel: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  cloudExplTabBar: {
    elevation: 0,
    backgroundColor: 'transparent',
    height: 78,
    paddingTop: 18,
    borderTopWidth: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  cloudExplTabBarTopBorder: {
    height: 1,
    backgroundColor: '#1A2A42',
  },
});

export default CloudExpltab;

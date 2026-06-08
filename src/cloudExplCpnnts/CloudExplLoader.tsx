import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

type CloudExplLoaderProps = {
  cloudExplColor?: string;
  cloudExplWidth?: number;
  cloudExplHeight?: number;
  cloudExplTrackColor?: string;
};

export function CloudExplLoader({
  cloudExplColor = '#0071e2',
  cloudExplWidth = 130,
  cloudExplHeight = 4,
  cloudExplTrackColor = 'rgba(0, 0, 0, 0.2)',
}: CloudExplLoaderProps) {
  const cloudExplProgress = useRef(new Animated.Value(0)).current;
  const cloudExplBorderRadius = Math.min(30, cloudExplHeight / 2);

  useEffect(() => {
    const cloudExplAnimation = Animated.loop(
      Animated.timing(cloudExplProgress, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    );

    cloudExplAnimation.start();

    return () => {
      cloudExplAnimation.stop();
    };
  }, [cloudExplProgress]);

  const cloudExplBarWidth = cloudExplProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, cloudExplWidth, 0],
  });

  const cloudExplBarLeft = cloudExplProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, cloudExplWidth],
  });

  return (
    <View
      style={[
        styles.cloudExplTrack,
        {
          width: cloudExplWidth,
          height: cloudExplHeight,
          borderRadius: cloudExplBorderRadius,
          backgroundColor: cloudExplTrackColor,
        },
      ]}>
      <Animated.View
        style={[
          styles.cloudExplBar,
          {
            height: cloudExplHeight,
            borderRadius: cloudExplBorderRadius,
            backgroundColor: cloudExplColor,
            width: cloudExplBarWidth,
            left: cloudExplBarLeft,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cloudExplTrack: {
    position: 'relative',
    overflow: 'hidden',
  },
  cloudExplBar: {
    position: 'absolute',
    top: 0,
  },
});

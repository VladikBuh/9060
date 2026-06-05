import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

type CloudExplLoaderProps = {
  cloudExplColor?: string;
  cloudExplDotSize?: number;
  cloudExplGap?: number;
};

export function CloudExplLoader({
  cloudExplColor = 'rgb(0, 113, 128)',
  cloudExplDotSize = 20,
  cloudExplGap = 6,
}: CloudExplLoaderProps) {
  const cloudExplOpacityA = useRef(new Animated.Value(0)).current;
  const cloudExplOpacityB = useRef(new Animated.Value(0)).current;
  const cloudExplOpacityC = useRef(new Animated.Value(0)).current;

  const cloudExplDots = useMemo(
    () => [
      {cloudExplKey: 'a', cloudExplOpacity: cloudExplOpacityA, cloudExplDelay: 0},
      {
        cloudExplKey: 'b',
        cloudExplOpacity: cloudExplOpacityB,
        cloudExplDelay: 330,
      },
      {
        cloudExplKey: 'c',
        cloudExplOpacity: cloudExplOpacityC,
        cloudExplDelay: 660,
      },
    ],
    [cloudExplOpacityA, cloudExplOpacityB, cloudExplOpacityC],
  );

  useEffect(() => {
    const cloudExplAnimations = cloudExplDots.map(dot =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot.cloudExplOpacity, {
            toValue: 1,
            duration: 0,
            delay: dot.cloudExplDelay,
            useNativeDriver: true,
          }),
          Animated.timing(dot.cloudExplOpacity, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot.cloudExplOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    cloudExplAnimations.forEach(anim => anim.start());

    return () => {
      cloudExplAnimations.forEach(anim => anim.stop());
    };
  }, [cloudExplDots]);

  return (
    <View style={[styles.cloudExplRow, {gap: cloudExplGap}]}>
      {cloudExplDots.map(dot => (
        <Animated.View
          key={dot.cloudExplKey}
          style={[
            styles.cloudExplDot,
            {
              width: cloudExplDotSize,
              height: cloudExplDotSize,
              borderRadius: cloudExplDotSize / 2,
              backgroundColor: cloudExplColor,
              opacity: dot.cloudExplOpacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cloudExplRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudExplDot: {},
});


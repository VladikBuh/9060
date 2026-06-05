import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {cloudExplImages} from '../cloudExplAssts';
import {CloudExplLoader} from '../cloudExplCpnnts/CloudExplLoader';
import {CloudExplRootStackParamList} from '../cloudExplNav/CloudExplTypes';

export function CloudExplSplashScreen() {
  const navigation =
    useNavigation<StackNavigationProp<CloudExplRootStackParamList>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigation]);

  return (
    <View style={styles.cloudExplRoot}>
      <Image
        source={cloudExplImages.background}
        style={styles.cloudExplBackgroundImage}
        resizeMode="cover"
      />
      <View style={styles.cloudExplContent}>
        <View style={styles.cloudExplLoaderWrap}>
          <CloudExplLoader cloudExplColor="rgb(0, 113, 128)" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
    backgroundColor: '#050714',
  },
  cloudExplBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  cloudExplContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudExplTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 48,
  },
  cloudExplLoaderWrap: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});

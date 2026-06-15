import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {cloudExplImages} from '../../cloudExplAssts';
import {CloudExplLoader} from '../../cloudExplCpnnts/CloudExplLoader';
import {useCloudExplNavigation} from '../../cloudExplNav/CloudExplNavigationContext';

export function CloudExplSplashScreen() {
  const {replaceRootScreen} = useCloudExplNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      replaceRootScreen('Onboarding');
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [replaceRootScreen]);

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

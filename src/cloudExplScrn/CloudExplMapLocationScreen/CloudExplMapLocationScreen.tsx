import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CloudExplBackgroundLayout} from '../../cloudExplCpnnts/CloudExplBackgroundLayout';
import {
  useCloudExplNavigation,
  useCloudExplStackParams,
} from '../../cloudExplNav/CloudExplNavigationContext';

export function CloudExplMapLocationScreen() {
  const {goBack} = useCloudExplNavigation();
  const {locationId} = useCloudExplStackParams('MapLocation');

  return (
    <CloudExplBackgroundLayout>
      <View style={styles.cloudExplRoot}>
        <Pressable onPress={() => goBack()} style={styles.cloudExplBack}>
          <Text style={styles.cloudExplBackText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.cloudExplTitle}>Location {locationId}</Text>
        <Text style={styles.cloudExplBody}>
          Detailed cloud conditions and map pin data will appear here.
        </Text>
      </View>
    </CloudExplBackgroundLayout>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  cloudExplBack: {
    marginBottom: 20,
  },
  cloudExplBackText: {
    color: '#4A9EFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cloudExplTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 16,
  },
  cloudExplBody: {
    color: '#7D88AD',
    fontSize: 16,
    lineHeight: 24,
  },
});

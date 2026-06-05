import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CloudExplBackgroundLayout} from '../cloudExplCpnnts/CloudExplBackgroundLayout';
import {CloudExplRootStackParamList} from '../cloudExplNav/CloudExplTypes';

export function CloudExplMapLocationScreen() {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<CloudExplRootStackParamList, 'MapLocation'>>();

  return (
    <CloudExplBackgroundLayout>
      <View style={styles.cloudExplRoot}>
        <Pressable onPress={() => navigation.goBack()} style={styles.cloudExplBack}>
          <Text style={styles.cloudExplBackText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.cloudExplTitle}>Location {route.params.locationId}</Text>
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

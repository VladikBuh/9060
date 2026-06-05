import React, {useMemo, useState} from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  type CloudExplMapLocation,
  cloudExplMapInitialRegion,
  cloudExplMapLocations,
} from '../cloudExplData/CloudExplMapLocations';
import {cloudExplMapStyle} from '../cloudExplThm/CloudExplMapStyle';
import {cloudExplColors} from '../cloudExplThm/CloudExplTheme';

function CloudExplMapMarkerView() {
  return (
    <View style={styles.cloudExplMarker}>
      <View style={styles.cloudExplMarkerRing} />
      <View style={styles.cloudExplMarkerDot} />
    </View>
  );
}

function CloudExplMapLocationModal({
  location,
  visible,
  onClose,
}: {
  location: CloudExplMapLocation | null;
  visible: boolean;
  onClose: () => void;
}) {
  const paragraphs = useMemo(() => {
    if (!location) {
      return [];
    }
    return location.longDescription
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean);
  }, [location]);

  if (!location) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.cloudExplModalBackdrop} onPress={onClose}>
        <Pressable style={styles.cloudExplModalCard} onPress={() => undefined}>
          <View style={styles.cloudExplModalImageWrap}>
            <Image
              source={location.image}
              style={styles.cloudExplModalImage}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.cloudExplModalTitle}>{location.title}</Text>
          <Text style={styles.cloudExplModalSubtitle}>
            {location.airshipName} · {location.shortDescription}
          </Text>

          {paragraphs.map((paragraph, index) => (
            <Text
              key={`${location.locationId}_p_${index}`}
              style={styles.cloudExplModalParagraph}>
              {paragraph}
            </Text>
          ))}

          <View style={styles.cloudExplModalActions}>
            <Pressable
              style={styles.cloudExplModalBtn}
              onPress={async () => {
                await Share.share({
                  message: `${location.title} — ${location.airshipName}\n\n${location.shortDescription}`,
                });
              }}>
              <Text style={styles.cloudExplModalBtnText}>Share</Text>
            </Pressable>
            <Pressable style={styles.cloudExplModalBtn} onPress={onClose}>
              <Text style={styles.cloudExplModalBtnText}>Close</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function CloudExplMapScreen() {
  const {width} = useWindowDimensions();
  const [cloudExplSelectedLocation, setCloudExplSelectedLocation] =
    useState<CloudExplMapLocation | null>(null);

  const cloudExplMapCardWidth = width - 32;

  return (
    <LinearGradient
      colors={[
        cloudExplColors.onboardingGradientTop,
        cloudExplColors.onboardingGradientBottom,
      ]}
      style={styles.cloudExplRoot}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingTop: 50, paddingBottom: 80}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cloudExplHeader}>
          <Text style={styles.cloudExplHeaderTitle}>Map</Text>
        </View>

        <View style={[styles.cloudExplMapCard, {width: cloudExplMapCardWidth}]}>
          <MapView
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            style={styles.cloudExplMap}
            initialRegion={cloudExplMapInitialRegion}
            customMapStyle={cloudExplMapStyle}
            rotateEnabled={false}
            pitchEnabled={false}
            toolbarEnabled={false}
            showsCompass={false}
            showsScale={false}
            showsBuildings={false}
            showsTraffic={false}
            showsIndoors={false}
            showsPointsOfInterest={false}
            showsMyLocationButton={false}>
            {cloudExplMapLocations.map(location => (
              <Marker
                key={location.locationId}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                onPress={() => setCloudExplSelectedLocation(location)}
                tracksViewChanges={false}>
                <CloudExplMapMarkerView />
              </Marker>
            ))}
          </MapView>
        </View>

        <CloudExplMapLocationModal
          location={cloudExplSelectedLocation}
          visible={cloudExplSelectedLocation !== null}
          onClose={() => setCloudExplSelectedLocation(null)}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
  },
  cloudExplHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  cloudExplHeaderTitle: {
    color: '#EAF4FF',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
  },
  cloudExplMapCard: {
    alignSelf: 'center',
    backgroundColor: '#5E93D4',
    borderRadius: 14,
    overflow: 'hidden',
    height: '86%',
    marginTop: 8,
  },
  cloudExplMap: {
    flex: 1,
  },
  cloudExplMarker: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudExplMarkerRing: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#FF4D4D',
    backgroundColor: 'rgba(255, 77, 77, 0.15)',
  },
  cloudExplMarkerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4D4D',
  },
  cloudExplModalBackdrop: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudExplModalCard: {
    backgroundColor: '#316FBA',
    borderRadius: 12,
    padding: 20,
    width: '84%',

    maxHeight: '78%',
  },
  cloudExplModalImageWrap: {
    backgroundColor: '#5C8EC8',
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  cloudExplModalImage: {
    width: '100%',
    height: '100%',
  },
  cloudExplModalTitle: {
    color: '#EAF4FF',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    marginBottom: 4,
  },
  cloudExplModalSubtitle: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  cloudExplModalParagraph: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },
  cloudExplModalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  cloudExplModalBtn: {
    flex: 1,
    backgroundColor: '#75A8E4',
    borderRadius: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudExplModalBtnText: {
    color: '#EAF4FF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

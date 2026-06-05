import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {cloudExplImages} from '../cloudExplAssts';
import {useCloudExplApp} from '../cloudExplCtx/CloudExplAppContext';
import {useCloudExplFavorites} from '../cloudExplCtx/CloudExplFavoritesContext';
import {cloudExplColors} from '../cloudExplThm/CloudExplTheme';

const cloudExplTabBarInset = 75;
const cloudExplShareMessage =
  'Explore the history of Arctic airships with Iron Cloud Explorers!';

function CloudExplSettingsToggle({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: (next: boolean) => void;
}) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{checked: value}}
      onPress={() => onValueChange(!value)}
      style={[
        styles.cloudExplToggleTrack,
        value ? styles.cloudExplToggleTrackOn : styles.cloudExplToggleTrackOff,
      ]}>
      <View
        style={[
          styles.cloudExplToggleThumb,
          value
            ? styles.cloudExplToggleThumbOn
            : styles.cloudExplToggleThumbOff,
        ]}
      />
    </Pressable>
  );
}

function CloudExplClearFavoritesModal({
  visible,
  onCancel,
  onClear,
}: {
  visible: boolean;
  onCancel: () => void;
  onClear: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [cloudExplBackdropReady, setCloudExplBackdropReady] = useState(false);

  useEffect(() => {
    if (!visible) {
      setCloudExplBackdropReady(false);
      return;
    }

    const cloudExplBackdropTimer = setTimeout(() => {
      setCloudExplBackdropReady(true);
    }, 250);

    return () => clearTimeout(cloudExplBackdropTimer);
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}>
      <View style={styles.cloudExplModalBackdrop}>
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={cloudExplBackdropReady ? onCancel : undefined}
          accessibilityRole="button"
          accessibilityLabel="Dismiss clear favorites dialog"
        />
        <View
          style={[
            styles.cloudExplModalSheet,
            {paddingBottom: Math.max(insets.bottom, 20)},
          ]}>
          <Text style={styles.cloudExplModalTitle}>Clear Favorites?</Text>
          <Text style={styles.cloudExplModalBody}>
            This action cannot be undone.
          </Text>
          <View style={styles.cloudExplModalActions}>
            <Pressable
              style={styles.cloudExplModalCancelBtn}
              onPress={onCancel}>
              <Text style={styles.cloudExplModalBtnText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.cloudExplModalClearBtn} onPress={onClear}>
              <Text style={styles.cloudExplModalBtnText}>Clear</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function CloudExplSettingsScreen() {
  const {width} = useWindowDimensions();
  const {vibrationEnabled, setVibrationEnabled} = useCloudExplApp();
  const {clearAllFavorites} = useCloudExplFavorites();
  const [cloudExplShowClearModal, setCloudExplShowClearModal] = useState(false);

  const cloudExplHeroSize = Math.min(width * 0.66, 252);

  const cloudExplHandleShareApp = async () => {
    await Share.share({message: cloudExplShareMessage});
  };

  const cloudExplHandleClearFavorites = () => {
    clearAllFavorites();
    setCloudExplShowClearModal(false);
  };

  return (
    <LinearGradient
      colors={[
        cloudExplColors.onboardingGradientTop,
        cloudExplColors.onboardingGradientBottom,
      ]}
      style={styles.cloudExplRoot}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingTop: 66}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.cloudExplHeaderTitle}>Settings</Text>

        <View style={styles.cloudExplList}>
          <View style={styles.cloudExplRow}>
            <View style={styles.cloudExplRowLeft}>
              <Text style={styles.cloudExplRowIcon}>📳</Text>
              <Text style={styles.cloudExplRowLabel}>Vibration</Text>
            </View>
            <CloudExplSettingsToggle
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
            />
          </View>

          <Pressable
            style={styles.cloudExplRow}
            onPress={() => setCloudExplShowClearModal(true)}>
            <View style={styles.cloudExplRowLeft}>
              <Text
                style={[styles.cloudExplRowIcon, styles.cloudExplTrashIcon]}>
                🗑
              </Text>
              <Text style={styles.cloudExplRowLabel}>Clear Favorites</Text>
            </View>
            <Text style={styles.cloudExplChevron}>›</Text>
          </Pressable>

          <Pressable
            style={styles.cloudExplRow}
            onPress={cloudExplHandleShareApp}>
            <View style={styles.cloudExplRowLeft}>
              <Text style={styles.cloudExplRowIcon}>⤴︎</Text>
              <Text style={styles.cloudExplRowLabel}>Share App</Text>
            </View>
            <Text style={styles.cloudExplChevron}>›</Text>
          </Pressable>
        </View>

        <View style={styles.cloudExplHeroWrap} pointerEvents="none">
          <Image
            source={cloudExplImages.settingsHero}
            style={[
              styles.cloudExplHero,
              {width: cloudExplHeroSize, height: cloudExplHeroSize},
            ]}
            resizeMode="contain"
          />
        </View>

        <CloudExplClearFavoritesModal
          visible={cloudExplShowClearModal}
          onCancel={() => setCloudExplShowClearModal(false)}
          onClear={cloudExplHandleClearFavorites}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
    paddingBottom: cloudExplTabBarInset,
  },
  cloudExplHeaderTitle: {
    color: '#EAF4FF',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  cloudExplList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  cloudExplRow: {
    backgroundColor: '#5E93D4',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cloudExplRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cloudExplRowIcon: {
    fontSize: 18,
    color: '#EAF4FF',
    width: 18,
    textAlign: 'center',
  },
  cloudExplTrashIcon: {
    color: '#FF6666',
  },
  cloudExplRowLabel: {
    color: '#EAF4FF',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22.5,
  },
  cloudExplChevron: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 22,
  },
  cloudExplToggleTrack: {
    width: 44,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
  },
  cloudExplToggleTrackOn: {
    backgroundColor: '#A8D8FF',
  },
  cloudExplToggleTrackOff: {
    backgroundColor: '#75A8E4',
  },
  cloudExplToggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 3,
  },
  cloudExplToggleThumbOn: {
    right: 3,
  },
  cloudExplToggleThumbOff: {
    left: 3,
  },
  cloudExplHeroWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  cloudExplHero: {
    opacity: 0.95,
    marginTop: 30,
  },
  cloudExplModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 20, 50, 0.58)',
    justifyContent: 'flex-end',
  },
  cloudExplModalSheet: {
    backgroundColor: '#5E93D4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    minHeight: 200,
  },
  cloudExplModalTitle: {
    color: '#EAF4FF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 25.5,
    marginBottom: 6,
  },
  cloudExplModalBody: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },
  cloudExplModalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  cloudExplModalCancelBtn: {
    flex: 1,
    backgroundColor: '#75A8E4',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cloudExplModalClearBtn: {
    flex: 1,
    backgroundColor: '#D94B4B',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cloudExplModalBtnText: {
    color: '#EAF4FF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

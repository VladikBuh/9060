import type {ReactNode} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {cloudExplImages} from '../cloudExplAssts';

type CloudExplBackgroundLayoutProps = {
  children: ReactNode;
  scroll?: boolean;
  background?: ImageSourcePropType;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function CloudExplBackgroundLayout({
  children,
  scroll = true,
  background = cloudExplImages.background,
  contentContainerStyle,
}: CloudExplBackgroundLayoutProps) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        styles.cloudExplContent,
        {
          paddingTop: 54,
          paddingBottom: Math.max(insets.bottom, 16),
        },
        !scroll && styles.cloudExplFlex,
        contentContainerStyle,
      ]}>
      {children}
    </View>
  );

  return (
    <View style={styles.cloudExplRoot}>
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          style={styles.cloudExplFlex}
          contentContainerStyle={styles.cloudExplScrollContent}
          showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
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
  cloudExplScrollContent: {
    flexGrow: 1,
  },
  cloudExplContent: {
    flexGrow: 1,
  },
  cloudExplFlex: {
    flex: 1,
  },
});

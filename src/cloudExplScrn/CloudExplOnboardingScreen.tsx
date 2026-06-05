import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {cloudExplImages} from '../cloudExplAssts';
import {useCloudExplApp} from '../cloudExplCtx/CloudExplAppContext';
import {cloudExplSaveOnboardingDone} from '../cloudExplStrg/CloudExplAppStorage';
import {cloudExplColors} from '../cloudExplThm/CloudExplTheme';

type CloudExplOnboardingStep = 'welcome' | 'polar' | 'map' | 'quiz';

type CloudExplOnboardingStepConfig = {
  cloudExplTitle: string;
  cloudExplBody: string;
  cloudExplCtaLabel: string;
  cloudExplHero: number;
  cloudExplIcon: number;
};

const cloudExplOnboardingSteps: Record<
  CloudExplOnboardingStep,
  CloudExplOnboardingStepConfig
> = {
  welcome: {
    cloudExplTitle: 'Welcome Aboard',
    cloudExplBody:
      'Discover the fascinating world of historic airships and aerial exploration.',
    cloudExplCtaLabel: 'Continue',
    cloudExplHero: cloudExplImages.onboardingHero2,
    cloudExplIcon: cloudExplImages.onboardingIconAnchor,
  },
  polar: {
    cloudExplTitle: 'Polar Expeditions',
    cloudExplBody:
      'Learn about ambitious flights across glaciers, ice fields, and northern skies.',
    cloudExplCtaLabel: 'Continue',
    cloudExplHero: cloudExplImages.onboardingHero3,
    cloudExplIcon: cloudExplImages.onboardingIconSnowflake,
  },
  map: {
    cloudExplTitle: 'Explore the Map',
    cloudExplBody:
      'Visit countries connected to famous airships and remarkable journeys.',
    cloudExplCtaLabel: 'Continue',
    cloudExplHero: cloudExplImages.onboardingHero4,
    cloudExplIcon: cloudExplImages.onboardingIconGlobe,
  },
  quiz: {
    cloudExplTitle: 'Test Your Knowledge',
    cloudExplBody:
      'Answer quiz questions and follow the timeline of airship development.',
    cloudExplCtaLabel: 'Get Started',
    cloudExplHero: cloudExplImages.onboardingHero1,
    cloudExplIcon: cloudExplImages.onboardingIconQuiz,
  },
};

export function CloudExplOnboardingScreen() {
  const navigation = useNavigation<any>();
  const {setOnboardingDone} = useCloudExplApp();
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();

  const [cloudExplStep, setCloudExplStep] =
    useState<CloudExplOnboardingStep>('welcome');

  const cloudExplStepOrder = useMemo<CloudExplOnboardingStep[]>(
    () => ['welcome', 'polar', 'map', 'quiz'],
    [],
  );

  const cloudExplCurrentIndex = cloudExplStepOrder.indexOf(cloudExplStep);
  const cloudExplStepContent = cloudExplOnboardingSteps[cloudExplStep];
  const cloudExplHeroSize = Math.min(350, width - 40);

  const cloudExplOnFinish = async () => {
    setOnboardingDone(true);
    await cloudExplSaveOnboardingDone(true);
    navigation.replace('Main');
  };

  const cloudExplOnNext = () => {
    if (cloudExplCurrentIndex >= cloudExplStepOrder.length - 1) {
      void cloudExplOnFinish();
      return;
    }
    setCloudExplStep(cloudExplStepOrder[cloudExplCurrentIndex + 1]);
  };

  return (
    <LinearGradient
      colors={[
        cloudExplColors.onboardingGradientTop,
        cloudExplColors.onboardingGradientBottom,
      ]}
      style={styles.cloudExplRoot}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.cloudExplContent,
            {
              paddingTop: Math.max(insets.top, 24),
              paddingBottom: Math.max(insets.bottom, 24),
            },
          ]}>
          <View
            style={[
              styles.cloudExplHeroFrame,
              {
                width: cloudExplHeroSize,
                height: cloudExplHeroSize,
              },
            ]}>
            <Image
              source={cloudExplStepContent.cloudExplHero}
              style={styles.cloudExplHeroImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.cloudExplIconWrap}>
            <Image
              source={cloudExplStepContent.cloudExplIcon}
              style={styles.cloudExplIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.cloudExplTitle}>
            {cloudExplStepContent.cloudExplTitle}
          </Text>

          <Text style={styles.cloudExplBody}>
            {cloudExplStepContent.cloudExplBody}
          </Text>

          <Pressable
            onPress={cloudExplOnNext}
            style={({pressed}) => [
              styles.cloudExplButton,
              pressed && styles.cloudExplButtonPressed,
            ]}>
            <Text style={styles.cloudExplButtonText}>
              {cloudExplStepContent.cloudExplCtaLabel}
            </Text>
          </Pressable>

          <View style={styles.cloudExplDotsRow}>
            {cloudExplStepOrder.map((step, dotIndex) => (
              <View
                key={step}
                style={[
                  styles.cloudExplDot,
                  dotIndex === cloudExplCurrentIndex
                    ? styles.cloudExplDotActive
                    : styles.cloudExplDotIdle,
                ]}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
  },
  cloudExplContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 22,
  },
  cloudExplHeroFrame: {
    backgroundColor: cloudExplColors.onboardingHeroFrame,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cloudExplHeroImage: {
    width: '100%',
    height: '100%',
  },
  cloudExplIconWrap: {
    backgroundColor: cloudExplColors.onboardingIconBg,
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudExplIcon: {
    width: 34,
    height: 34,
  },
  cloudExplTitle: {
    color: cloudExplColors.onboardingTitle,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 36,
  },
  cloudExplBody: {
    color: cloudExplColors.onboardingBody,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24.75,
    maxWidth: 329,
  },
  cloudExplButton: {
    backgroundColor: cloudExplColors.onboardingButtonBg,
    borderRadius: 24,
    minHeight: 46.5,
    paddingHorizontal: 28,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudExplButtonPressed: {
    opacity: 0.88,
  },
  cloudExplButtonText: {
    color: cloudExplColors.onboardingButtonText,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22.5,
  },
  cloudExplDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  cloudExplDot: {
    borderRadius: 3,
  },
  cloudExplDotIdle: {
    width: 6,
    height: 6,
    backgroundColor: cloudExplColors.onboardingDotIdle,
  },
  cloudExplDotActive: {
    width: 20,
    height: 6,
    backgroundColor: cloudExplColors.onboardingDotActive,
  },
});

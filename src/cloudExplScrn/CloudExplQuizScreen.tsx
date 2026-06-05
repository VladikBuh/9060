import React, {useCallback, useState} from 'react';
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
import {cloudExplImages} from '../cloudExplAssts';
import {CloudExplQuizPlayView} from '../cloudExplCpnnts/CloudExplQuizPlayView';
import {cloudExplQuizRoundSize} from '../cloudExplData/CloudExplQuizData';
import {cloudExplColors} from '../cloudExplThm/CloudExplTheme';

type CloudExplQuizScreenPhase = 'intro' | 'playing';

export function CloudExplQuizScreen() {
  const {width} = useWindowDimensions();
  const [cloudExplPhase, setCloudExplPhase] =
    useState<CloudExplQuizScreenPhase>('intro');
  const [cloudExplPlaySession, setCloudExplPlaySession] = useState(0);
  const cloudExplHeroSize = Math.min(width * 0.67, 262);

  const cloudExplStartQuiz = useCallback(() => {
    setCloudExplPlaySession(prev => prev + 1);
    setCloudExplPhase('playing');
  }, []);

  if (cloudExplPhase === 'playing') {
    return (
      <CloudExplQuizPlayView
        key={cloudExplPlaySession}
        onLeave={() => setCloudExplPhase('intro')}
      />
    );
  }

  return (
    <LinearGradient
      colors={[
        cloudExplColors.onboardingGradientTop,
        cloudExplColors.onboardingGradientBottom,
      ]}
      style={styles.cloudExplRoot}>
      <ScrollView
        contentContainerStyle={styles.cloudExplScroll}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.cloudExplHeaderTitle}>Quiz</Text>

        <View style={styles.cloudExplIntroBody}>
          <Image
            source={cloudExplImages.quizIntro}
            style={[
              styles.cloudExplHero,
              {width: cloudExplHeroSize, height: cloudExplHeroSize * 0.98},
            ]}
            resizeMode="contain"
          />

          <Text style={styles.cloudExplTitle}>Airship Quiz</Text>
          <Text style={styles.cloudExplBody}>
            Test your knowledge of historic airships and polar expeditions.
          </Text>
          <Text style={styles.cloudExplMeta}>
            {cloudExplQuizRoundSize} questions per round
          </Text>

          <Pressable
            style={styles.cloudExplStartBtn}
            onPress={cloudExplStartQuiz}>
            <Text style={styles.cloudExplStartBtnText}>Start Quiz</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
  },
  cloudExplScroll: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 94,
  },
  cloudExplHeaderTitle: {
    color: '#EAF4FF',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
    marginBottom: 24,
  },
  cloudExplIntroBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudExplHero: {
    marginBottom: 24,
  },
  cloudExplTitle: {
    color: '#EAF4FF',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
    marginBottom: 8,
    marginTop: 22,
  },
  cloudExplBody: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
    maxWidth: 336,
    marginBottom: 8,
  },
  cloudExplMeta: {
    color: 'rgba(234, 244, 255, 0.45)',
    fontSize: 12,
    marginBottom: 20,
  },
  cloudExplStartBtn: {
    backgroundColor: '#A8D8FF',
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 12,
    minWidth: 132,
    alignItems: 'center',
    marginTop: 10,
  },
  cloudExplStartBtnText: {
    color: '#1A4A7A',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
});

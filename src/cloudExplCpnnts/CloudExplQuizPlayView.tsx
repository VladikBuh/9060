import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {cloudExplImages} from '../cloudExplAssts';
import {useCloudExplApp} from '../cloudExplCtx/CloudExplAppContext';
import {
  type CloudExplQuizQuestion,
  cloudExplCreateQuizRound,
} from '../cloudExplData/CloudExplQuizData';
import {cloudExplColors} from '../cloudExplThm/CloudExplTheme';
import {
  cloudExplVibrateQuizComplete,
  cloudExplVibrateQuizCorrect,
  cloudExplVibrateQuizWrong,
} from '../cloudExplUtil/CloudExplVibration';

type CloudExplQuizPhase = 'playing' | 'complete';

const cloudExplTabBarInset = 75;

function CloudExplLeaveQuizModal({
  visible,
  onStay,
  onLeave,
}: {
  visible: boolean;
  onStay: () => void;
  onLeave: () => void;
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
      onRequestClose={onStay}>
      <View style={styles.cloudExplLeaveBackdrop}>
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={cloudExplBackdropReady ? onStay : undefined}
          accessibilityRole="button"
          accessibilityLabel="Dismiss leave quiz dialog"
        />
        <View
          style={[
            styles.cloudExplLeaveSheet,
            {paddingBottom: Math.max(insets.bottom, 20)},
          ]}>
          <Text style={styles.cloudExplLeaveTitle}>Leave Quiz?</Text>
          <View style={styles.cloudExplLeaveActions}>
            <Pressable style={styles.cloudExplLeaveStayBtn} onPress={onStay}>
              <Text style={styles.cloudExplLeaveBtnText}>Stay</Text>
            </Pressable>
            <Pressable style={styles.cloudExplLeaveQuitBtn} onPress={onLeave}>
              <Text style={styles.cloudExplLeaveBtnText}>Leave</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function CloudExplQuizPlayView({onLeave}: {onLeave: () => void}) {
  const {width} = useWindowDimensions();
  const {vibrationEnabled} = useCloudExplApp();
  const cloudExplResultHeroSize = Math.min(width * 0.67, 262);
  const [cloudExplQuestions, setCloudExplQuestions] = useState(() =>
    cloudExplCreateQuizRound(),
  );
  const [cloudExplPhase, setCloudExplPhase] =
    useState<CloudExplQuizPhase>('playing');
  const [cloudExplQuestionIndex, setCloudExplQuestionIndex] = useState(0);
  const [cloudExplScore, setCloudExplScore] = useState(0);
  const [cloudExplSelectedIndex, setCloudExplSelectedIndex] = useState<
    number | null
  >(null);
  const [cloudExplShowLeaveModal, setCloudExplShowLeaveModal] = useState(false);
  const cloudExplScrollRef = useRef<ScrollView>(null);

  const cloudExplCurrentQuestion: CloudExplQuizQuestion | undefined =
    cloudExplQuestions[cloudExplQuestionIndex];

  const cloudExplAnswerLocked = cloudExplSelectedIndex !== null;

  useEffect(() => {
    if (!cloudExplAnswerLocked) {
      return;
    }

    const cloudExplScrollTimer = setTimeout(() => {
      cloudExplScrollRef.current?.scrollToEnd({animated: true});
    }, 80);

    return () => clearTimeout(cloudExplScrollTimer);
  }, [cloudExplAnswerLocked, cloudExplQuestionIndex]);

  const cloudExplHandleRestartInPlace = useCallback(() => {
    setCloudExplQuestions(cloudExplCreateQuizRound());
    setCloudExplPhase('playing');
    setCloudExplQuestionIndex(0);
    setCloudExplScore(0);
    setCloudExplSelectedIndex(null);
  }, []);

  const cloudExplHandleAnswer = (optionIndex: number) => {
    if (cloudExplAnswerLocked || !cloudExplCurrentQuestion) {
      return;
    }

    const cloudExplIsCorrect =
      optionIndex === cloudExplCurrentQuestion.correctIndex;

    setCloudExplSelectedIndex(optionIndex);
    if (cloudExplIsCorrect) {
      setCloudExplScore(prev => prev + 1);
    }

    if (vibrationEnabled) {
      if (cloudExplIsCorrect) {
        cloudExplVibrateQuizCorrect();
      } else {
        cloudExplVibrateQuizWrong();
      }
    }
  };

  const cloudExplHandleNext = () => {
    if (!cloudExplAnswerLocked) {
      return;
    }

    if (cloudExplQuestionIndex >= cloudExplQuestions.length - 1) {
      if (vibrationEnabled) {
        cloudExplVibrateQuizComplete();
      }
      setCloudExplPhase('complete');
      return;
    }

    setCloudExplQuestionIndex(prev => prev + 1);
    setCloudExplSelectedIndex(null);
  };

  const cloudExplOptionStyle = useCallback(
    (optionIndex: number) => {
      if (!cloudExplAnswerLocked || !cloudExplCurrentQuestion) {
        return styles.cloudExplOptionDefault;
      }

      if (optionIndex === cloudExplCurrentQuestion.correctIndex) {
        return styles.cloudExplOptionCorrect;
      }

      if (optionIndex === cloudExplSelectedIndex) {
        return styles.cloudExplOptionWrong;
      }

      return styles.cloudExplOptionDefault;
    },
    [cloudExplAnswerLocked, cloudExplCurrentQuestion, cloudExplSelectedIndex],
  );

  if (cloudExplPhase === 'complete') {
    return (
      <LinearGradient
        colors={[
          cloudExplColors.onboardingGradientTop,
          cloudExplColors.onboardingGradientBottom,
        ]}
        style={styles.cloudExplRoot}>
        <View style={styles.cloudExplContent}>
          <ScrollView
            style={styles.cloudExplScrollArea}
            contentContainerStyle={[
              styles.cloudExplCompleteWrap,
              {paddingBottom: cloudExplTabBarInset + 16},
            ]}
            showsVerticalScrollIndicator={false}>
            <Image
              source={cloudExplImages.quizResult}
              style={[
                styles.cloudExplCompleteHero,
                {
                  width: cloudExplResultHeroSize,
                  height: cloudExplResultHeroSize * 0.98,
                },
              ]}
              resizeMode="contain"
            />
            <Text style={styles.cloudExplCompleteTitle}>Quiz Complete</Text>
            <View style={styles.cloudExplScoreCard}>
              <Text style={styles.cloudExplScoreLabel}>Your Score</Text>
              <Text style={styles.cloudExplScoreValue}>
                {cloudExplScore} / {cloudExplQuestions.length}
              </Text>
            </View>
            <Pressable
              style={styles.cloudExplRestartBtn}
              onPress={cloudExplHandleRestartInPlace}>
              <Text style={styles.cloudExplRestartBtnText}>Restart Quiz</Text>
            </Pressable>
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }

  if (!cloudExplCurrentQuestion) {
    return null;
  }

  return (
    <LinearGradient
      colors={[
        cloudExplColors.onboardingGradientTop,
        cloudExplColors.onboardingGradientBottom,
      ]}
      style={styles.cloudExplRoot}>
      <View style={styles.cloudExplContent}>
        <ScrollView
          ref={cloudExplScrollRef}
          style={styles.cloudExplScrollArea}
          contentContainerStyle={[
            styles.cloudExplScroll,
            {paddingBottom: cloudExplTabBarInset + 66},
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.cloudExplTopBar}>
            <Text style={styles.cloudExplProgress}>
              Question {cloudExplQuestionIndex + 1} /{' '}
              {cloudExplQuestions.length}
            </Text>
            <Pressable
              style={styles.cloudExplCloseBtn}
              onPress={() => {
                setTimeout(() => setCloudExplShowLeaveModal(true), 0);
              }}
              hitSlop={12}>
              <Text style={styles.cloudExplCloseText}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.cloudExplImageWrap}>
            <Image
              source={cloudExplCurrentQuestion.image}
              style={styles.cloudExplImage}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.cloudExplQuestion}>
            {cloudExplCurrentQuestion.question}
          </Text>

          <View style={styles.cloudExplOptions}>
            {cloudExplCurrentQuestion.options.map((option, index) => (
              <Pressable
                key={`${cloudExplCurrentQuestion.questionId}_${index}`}
                style={[styles.cloudExplOption, cloudExplOptionStyle(index)]}
                onPress={() => cloudExplHandleAnswer(index)}
                disabled={cloudExplAnswerLocked}>
                <Text style={styles.cloudExplOptionText}>{option}</Text>
              </Pressable>
            ))}
          </View>

          {cloudExplAnswerLocked ? (
            <View style={styles.cloudExplNextWrap}>
              <Pressable
                style={styles.cloudExplNextBtn}
                onPress={cloudExplHandleNext}>
                <Text style={styles.cloudExplNextBtnText}>
                  {cloudExplQuestionIndex >= cloudExplQuestions.length - 1
                    ? 'Finish'
                    : 'Next'}
                </Text>
              </Pressable>
            </View>
          ) : null}
        </ScrollView>
      </View>

      <CloudExplLeaveQuizModal
        visible={cloudExplShowLeaveModal}
        onStay={() => setCloudExplShowLeaveModal(false)}
        onLeave={() => {
          setCloudExplShowLeaveModal(false);
          onLeave();
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
  },
  cloudExplContent: {
    flex: 1,
  },
  cloudExplTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingTop: 66,
    paddingBottom: 8,
  },
  cloudExplScrollArea: {
    flex: 1,
  },
  cloudExplProgress: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 13,
    lineHeight: 20,
  },
  cloudExplCloseBtn: {
    padding: 4,
  },
  cloudExplCloseText: {
    color: '#EAF4FF',
    fontSize: 18,
    lineHeight: 20,
  },
  cloudExplScroll: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
  },
  cloudExplImageWrap: {
    backgroundColor: '#5C8EC8',
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cloudExplImage: {
    width: '100%',
    height: '100%',
  },
  cloudExplQuestion: {
    color: '#EAF4FF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 14,
    marginBottom: 16,
  },
  cloudExplOptions: {
    gap: 10,
  },
  cloudExplOption: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  cloudExplOptionDefault: {
    backgroundColor: '#75A8E4',
  },
  cloudExplOptionCorrect: {
    backgroundColor: '#3DAA5C',
  },
  cloudExplOptionWrong: {
    backgroundColor: '#D94B4B',
  },
  cloudExplOptionText: {
    color: '#EAF4FF',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  cloudExplNextWrap: {
    alignItems: 'center',
    marginTop: 40,
    paddingTop: 4,
  },
  cloudExplNextBtn: {
    backgroundColor: '#A8D8FF',
    borderRadius: 24,
    paddingHorizontal: 36,
    paddingVertical: 12,
    minWidth: 159,
    alignItems: 'center',
  },
  cloudExplNextBtnText: {
    color: '#1A4A7A',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  cloudExplLeaveBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 20, 50, 0.58)',
    justifyContent: 'flex-end',
  },
  cloudExplLeaveSheet: {
    backgroundColor: '#5E93D4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '100%',
    minHeight: 200,
  },
  cloudExplLeaveTitle: {
    color: '#EAF4FF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 18,
  },
  cloudExplLeaveActions: {
    flexDirection: 'row',
    gap: 10,
  },
  cloudExplLeaveStayBtn: {
    flex: 1,
    backgroundColor: '#75A8E4',
    borderRadius: 10,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudExplLeaveQuitBtn: {
    flex: 1,
    backgroundColor: '#D94B4B',
    borderRadius: 10,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudExplLeaveBtnText: {
    color: '#EAF4FF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  cloudExplCompleteWrap: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  cloudExplCompleteHero: {
    marginBottom: 24,
  },
  cloudExplCompleteTitle: {
    color: '#EAF4FF',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
    marginBottom: 24,
    textAlign: 'center',
  },
  cloudExplScoreCard: {
    backgroundColor: '#5E93D4',
    borderRadius: 14,
    paddingHorizontal: 44,
    paddingVertical: 24,
    alignItems: 'center',
    minWidth: 182,
    marginBottom: 40,
  },
  cloudExplScoreLabel: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 6,
    textAlign: 'center',
  },
  cloudExplScoreValue: {
    color: '#A8D8FF',
    fontSize: 44,
    fontWeight: '700',
    lineHeight: 66,
    textAlign: 'center',
  },
  cloudExplRestartBtn: {
    backgroundColor: '#A8D8FF',
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
    minWidth: 147,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudExplRestartBtnText: {
    color: '#1A4A7A',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
});

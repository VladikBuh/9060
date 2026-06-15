import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useCloudExplNavigation} from '../../cloudExplNav/CloudExplNavigationContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {cloudExplImages} from '../../cloudExplAssts';
import {
  type CloudExplQuizQuestion,
  cloudExplShuffleQuizQuestions,
} from '../../cloudExplData/CloudExplQuizData';
import {cloudExplColors} from '../../cloudExplThm/CloudExplTheme';

type CloudExplQuizPhase = 'playing' | 'complete';

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
          onPress={onStay}
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

export function CloudExplQuizDetailScreen() {
  const {goBack} = useCloudExplNavigation();
  const insets = useSafeAreaInsets();
  const [cloudExplQuestions, setCloudExplQuestions] = useState(() =>
    cloudExplShuffleQuizQuestions(),
  );
  const [cloudExplPhase, setCloudExplPhase] =
    useState<CloudExplQuizPhase>('playing');
  const [cloudExplQuestionIndex, setCloudExplQuestionIndex] = useState(0);
  const [cloudExplScore, setCloudExplScore] = useState(0);
  const [cloudExplSelectedIndex, setCloudExplSelectedIndex] = useState<
    number | null
  >(null);
  const [cloudExplShowLeaveModal, setCloudExplShowLeaveModal] = useState(false);

  const cloudExplCurrentQuestion: CloudExplQuizQuestion | undefined =
    cloudExplQuestions[cloudExplQuestionIndex];

  const cloudExplAnswerLocked = cloudExplSelectedIndex !== null;

  const cloudExplHandleRestartInPlace = useCallback(() => {
    setCloudExplQuestions(cloudExplShuffleQuizQuestions());
    setCloudExplPhase('playing');
    setCloudExplQuestionIndex(0);
    setCloudExplScore(0);
    setCloudExplSelectedIndex(null);
  }, []);

  const cloudExplHandleAnswer = (optionIndex: number) => {
    if (cloudExplAnswerLocked || !cloudExplCurrentQuestion) {
      return;
    }

    setCloudExplSelectedIndex(optionIndex);
    if (optionIndex === cloudExplCurrentQuestion.correctIndex) {
      setCloudExplScore(prev => prev + 1);
    }
  };

  const cloudExplHandleNext = () => {
    if (!cloudExplAnswerLocked) {
      return;
    }

    if (cloudExplQuestionIndex >= cloudExplQuestions.length - 1) {
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

  const cloudExplCompleteContent = useMemo(
    () => (
      <View style={styles.cloudExplCompleteWrap}>
        <Image
          source={cloudExplImages.quizResult}
          style={styles.cloudExplCompleteHero}
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
          style={styles.cloudExplNextBtn}
          onPress={cloudExplHandleRestartInPlace}>
          <Text style={styles.cloudExplNextBtnText}>Restart Quiz</Text>
        </Pressable>
      </View>
    ),
    [cloudExplHandleRestartInPlace, cloudExplQuestions.length, cloudExplScore],
  );

  if (cloudExplPhase === 'complete') {
    return (
      <LinearGradient
        colors={[
          cloudExplColors.onboardingGradientTop,
          cloudExplColors.onboardingGradientBottom,
        ]}
        style={styles.cloudExplRoot}>
        {cloudExplCompleteContent}
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
      <ScrollView
        style={styles.cloudExplScrollArea}
        contentContainerStyle={styles.cloudExplScroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View
          style={[
            styles.cloudExplTopBar,
            {paddingTop: Math.max(insets.top, 66)},
          ]}>
          <Text style={styles.cloudExplProgress}>
            Question {cloudExplQuestionIndex + 1} / {cloudExplQuestions.length}
          </Text>
          <Pressable
            style={styles.cloudExplCloseBtn}
            onPress={() => setCloudExplShowLeaveModal(true)}
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
      </ScrollView>

      {cloudExplAnswerLocked ? (
        <View
          style={[
            styles.cloudExplNextWrap,
            {paddingBottom: Math.max(insets.bottom, 16)},
          ]}>
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

      <CloudExplLeaveQuizModal
        visible={cloudExplShowLeaveModal}
        onStay={() => setCloudExplShowLeaveModal(false)}
        onLeave={() => {
          setCloudExplShowLeaveModal(false);
          goBack();
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
  },
  cloudExplTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
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
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(234, 244, 255, 0.12)',
    backgroundColor: 'rgba(79, 132, 200, 0.35)',
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
    flex: 1,
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  cloudExplCompleteHero: {
    width: 262,
    height: 258,
    marginBottom: 24,
  },
  cloudExplCompleteTitle: {
    color: '#EAF4FF',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
    marginBottom: 24,
  },
  cloudExplScoreCard: {
    backgroundColor: '#5E93D4',
    borderRadius: 14,
    paddingHorizontal: 44,
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 40,
  },
  cloudExplScoreLabel: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 6,
  },
  cloudExplScoreValue: {
    color: '#A8D8FF',
    fontSize: 44,
    fontWeight: '700',
    lineHeight: 66,
  },
});

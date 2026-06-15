import React, {useMemo, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {cloudExplTimelineEvents} from '../../cloudExplData/CloudExplTimelineEvents';
import {cloudExplColors} from '../../cloudExplThm/CloudExplTheme';

const cloudExplTabBarInset = 75;

function CloudExplTimelineStep({
  index,
  label,
  active,
  onPress,
}: {
  index: number;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.cloudExplStepItem} onPress={onPress}>
      <View
        style={[
          styles.cloudExplStepCircle,
          active
            ? styles.cloudExplStepCircleActive
            : styles.cloudExplStepCircleIdle,
        ]}>
        <Text
          style={[
            styles.cloudExplStepNumber,
            active
              ? styles.cloudExplStepNumberActive
              : styles.cloudExplStepNumberIdle,
          ]}>
          {index + 1}
        </Text>
      </View>
      <Text
        style={[
          styles.cloudExplStepLabel,
          active
            ? styles.cloudExplStepLabelActive
            : styles.cloudExplStepLabelIdle,
        ]}
        numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  );
}

export function CloudExplTimelineScreen() {
  const [cloudExplActiveIndex, setCloudExplActiveIndex] = useState(0);
  const cloudExplStepperRef = useRef<ScrollView>(null);

  const cloudExplActiveEvent = cloudExplTimelineEvents[cloudExplActiveIndex];

  const cloudExplParagraphs = useMemo(
    () =>
      cloudExplActiveEvent.description
        .split('\n\n')
        .map(paragraph => paragraph.trim())
        .filter(Boolean),
    [cloudExplActiveEvent.description],
  );

  const cloudExplSelectStep = (index: number) => {
    setCloudExplActiveIndex(index);
    cloudExplStepperRef.current?.scrollTo({
      x: Math.max(0, index * 46 - 80),
      animated: true,
    });
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
        <Text style={styles.cloudExplHeaderTitle}>Timeline</Text>

        <ScrollView
          style={styles.cloudExplContentScroll}
          contentContainerStyle={styles.cloudExplContentScrollInner}
          showsVerticalScrollIndicator={false}>
          <View style={styles.cloudExplImageWrap}>
            <Image
              source={cloudExplActiveEvent.image}
              style={styles.cloudExplImage}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.cloudExplEventTitle}>
            {cloudExplActiveEvent.title}
          </Text>
          <Text style={styles.cloudExplEventDate}>
            {cloudExplActiveEvent.dateLabel}
          </Text>

          {cloudExplParagraphs.map((paragraph, index) => (
            <Text
              key={`${cloudExplActiveEvent.eventId}_p_${index}`}
              style={styles.cloudExplEventBody}>
              {paragraph}
            </Text>
          ))}
        </ScrollView>

        <View style={styles.cloudExplStepperWrap}>
          <ScrollView
            ref={cloudExplStepperRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cloudExplStepperScroll}>
            {cloudExplTimelineEvents.map((event, index) => (
              <React.Fragment key={event.eventId}>
                <CloudExplTimelineStep
                  index={index}
                  label={event.stepLabel}
                  active={index === cloudExplActiveIndex}
                  onPress={() => cloudExplSelectStep(index)}
                />
                {index < cloudExplTimelineEvents.length - 1 ? (
                  <View style={styles.cloudExplStepConnector} />
                ) : null}
              </React.Fragment>
            ))}
          </ScrollView>
        </View>
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
    paddingBottom: 8,
  },
  cloudExplContentScroll: {
    flex: 1,
  },
  cloudExplContentScrollInner: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  cloudExplImageWrap: {
    backgroundColor: '#5C8EC8',
    height: 166,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  cloudExplImage: {
    width: '100%',
    height: '100%',
  },
  cloudExplEventTitle: {
    color: '#EAF4FF',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    marginBottom: 4,
  },
  cloudExplEventDate: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  cloudExplEventBody: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 14,
    lineHeight: 23,
    marginBottom: 12,
  },
  cloudExplStepperWrap: {
    paddingTop: 10,
    paddingBottom: 8,
  },
  cloudExplStepperScroll: {
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  cloudExplStepItem: {
    width: 46,
    alignItems: 'center',
  },
  cloudExplStepCircle: {
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  cloudExplStepCircleActive: {
    width: 36,
    height: 36,
    backgroundColor: '#A8D8FF',
  },
  cloudExplStepCircleIdle: {
    width: 22,
    height: 22,
    backgroundColor: '#75A8E4',
    marginTop: 7,
  },
  cloudExplStepNumber: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
  },
  cloudExplStepNumberActive: {
    color: '#1A4A7A',
  },
  cloudExplStepNumberIdle: {
    color: 'rgba(234, 244, 255, 0.62)',
  },
  cloudExplStepLabel: {
    fontSize: 8,
    lineHeight: 12,
    textAlign: 'center',
    width: 46,
  },
  cloudExplStepLabelActive: {
    color: '#EAF4FF',
  },
  cloudExplStepLabelIdle: {
    color: 'rgba(234, 244, 255, 0.62)',
  },
  cloudExplStepConnector: {
    width: 20,
    height: 2,
    backgroundColor: '#75A8E4',
    marginTop: 18,
    marginHorizontal: 0,
  },
});

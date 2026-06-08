import {Platform} from 'react-native';

export const cloudExplColors = {
  onboardingGradientTop: 'rgb(94, 172, 244)',
  onboardingGradientBottom: 'rgb(15, 54, 90)',
  onboardingHeroFrame: '#5C8EC8',
  onboardingIconBg: '#5E93D4',
  onboardingTitle: '#EAF4FF',
  onboardingBody: 'rgba(234, 244, 255, 0.62)',
  onboardingButtonBg: '#A8D8FF',
  onboardingButtonText: '#1A4A7A',
  onboardingDotActive: '#A8D8FF',
  onboardingDotIdle: 'rgba(234, 244, 255, 0.62)',
  background: '#050714',
  panel: 'rgba(20, 29, 58, 0.72)',
  panelStrong: 'rgba(10, 15, 34, 0.92)',
  accent: '#4A9EFF',
  accentYellow: '#F7C948',
  accentPurple: '#A06BFF',
  text: '#FFFFFF',
  textMuted: '#7D88AD',
  tabIdle: '#4A5478',
  border: '#1A2347',
  white: '#FFFFFF',
  black: '#050714',
};

export const cloudExplMetrics = {
  screenPadding: 16,
  cardRadius: 20,
  tabHeight: 78,
  tabBottomOffset: Platform.OS === 'ios' ? 0 : 0,
  androidEdge: Platform.OS === 'android' ? 30 : 0,
};

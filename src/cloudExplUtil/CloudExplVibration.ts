import {Vibration} from 'react-native';

export const cloudExplVibrateQuizCorrect = () => {
  Vibration.vibrate(40);
};

export const cloudExplVibrateQuizWrong = () => {
  Vibration.vibrate([0, 50, 40, 50]);
};

export const cloudExplVibrateQuizComplete = () => {
  Vibration.vibrate([0, 35, 30, 35, 30, 35]);
};

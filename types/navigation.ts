import type { NavigatorScreenParams } from '@react-navigation/native';
import type { ColorPalette } from '../types';

export type MainStackParamList = {
  Home: undefined;
  ColorPalette: ColorPalette;
};

export type RootStackParamList = {
  MainStack: NavigatorScreenParams<MainStackParamList>;
  AddNewPaletteModal: undefined;
};

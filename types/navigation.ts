import type { NavigatorScreenParams } from '@react-navigation/native';
import type { ColorPalette } from '../types';
import type { CompositeScreenProps } from '@react-navigation/native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';


export type MainStackParamList = {
  Home: { newPalette?: ColorPalette };
  ColorPalette: ColorPalette;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainStackParamList>;
  AddNewPaletteModal: undefined;
};

export type RootStackScreenProps = NativeStackScreenProps<RootStackParamList>

export type MainStackScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

import React from 'react';
import { Text, StyleSheet, FlatList } from 'react-native';
import ColorBox from '../components/ColorBox';

import type { MainStackParamList } from '../types';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<MainStackParamList, 'ColorPalette'>;

const ColorPalette = ({ route }: Props) => {
  const { paletteName, colors } = route.params;
  return (
    <FlatList
      data={colors}
      style={styles.container}
      renderItem={({ item }) => (
        <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
      )}
      keyExtractor={item => item.hexCode}
      ListHeaderComponent={<Text style={styles.title}>{paletteName}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    // flex: 2,
    padding: 20,
    backgroundColor: 'white',
  },
});

export default ColorPalette;

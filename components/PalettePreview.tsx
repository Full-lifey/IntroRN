import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';

import type { ColorPalette } from '../types';

type Props = {
  palette: ColorPalette;
  onPress: () => void;
};

const PalettePreview = ({ palette, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{palette.paletteName}</Text>
      <FlatList
        horizontal
        data={palette.colors.slice(0, 5)}
        renderItem={({ item }) => (
          <View
            style={[styles.colorPreview, { backgroundColor: item.hexCode }]}
          />
        )}
        keyExtractor={item => item.hexCode}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  colorPreview: {
    height: 25,
    width: 25,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default PalettePreview;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getContrastYIQ } from '../utilities';

import type { Colors } from '../types/';

const ColorBox = ({ colorName, hexCode }: Colors) => {
  return (
    <View style={[styles.colorContainer, { backgroundColor: hexCode }]}>
      <Text
        style={[
          styles.colorText,
          {
            color: getContrastYIQ(hexCode),
          },
        ]}>
        {colorName}: {hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  colorText: {
    fontSize: 12,
  },
  colorContainer: {
    height: 30,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default ColorBox;

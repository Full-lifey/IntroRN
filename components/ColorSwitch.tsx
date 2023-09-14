import React from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';

import type { Colors } from '../types';

type Props = {
  color: Colors;
  value: boolean;
  onChange: ({ colorName, hexCode }: Colors) => void;
};

const ColorSwitch = ({ color, onChange, value }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{color.colorName}</Text>
      <Switch onValueChange={() => onChange(color)} value={value} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: { color: 'black' },
});

export default ColorSwitch;

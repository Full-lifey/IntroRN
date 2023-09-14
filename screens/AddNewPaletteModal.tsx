import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import ColorSwitch from '../components/ColorSwitch';
import { FlatList } from 'react-native-gesture-handler';

import type { Colors } from '../types';

type ToggledColors = {
  string: Colors;
};

// const initialToggledColors: ToggledColors = {
//   colorsByName: {},
// };

const colors: Colors[] = [
  { colorName: 'AliceBlue', hexCode: '#F0F8FF' },
  { colorName: 'AntiqueWhite', hexCode: '#FAEBD7' },
  { colorName: 'Aqua', hexCode: '#00FFFF' },
  { colorName: 'Aquamarine', hexCode: '#7FFFD4' },
];

const AddNewPaletteModal = () => {
  const [paletteName, setPaletteName] = React.useState('');
  const [toggledColors, setToggledColors] = React.useState<ToggledColors | {}>(
    {},
  );

  const handleColorToggle = ({ colorName, hexCode }: Colors) => {
    setToggledColors(prevState => {
      console.log('prevState', prevState);
      const newState = Object.create(prevState);
      if (colorName in newState) {
        delete newState[colorName];
      } else {
        newState[colorName] = { colorName, hexCode };
      }
      console.log('newState', newState);
      return newState;
    });
  };

  const isColorSelected = React.useCallback(
    (colorName: string) => colorName in toggledColors,
    [toggledColors],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Name of your new color palette</Text>
      {/* <Text>Current value: {paletteName}</Text> */}
      <TextInput
        style={styles.textInput}
        value={paletteName}
        onChangeText={setPaletteName}
        placeholder="Just an input"
      />
      <FlatList
        data={colors}
        keyExtractor={item => item.hexCode}
        renderItem={({ item }) => (
          <ColorSwitch
            color={item}
            value={isColorSelected(item.colorName)}
            onChange={handleColorToggle}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  text: { color: 'black' },
  textInput: {
    margin: 2,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
  },
});

export default AddNewPaletteModal;

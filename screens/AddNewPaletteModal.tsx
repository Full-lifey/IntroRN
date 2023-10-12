import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
  TouchableOpacity
} from 'react-native';
import ColorSwitch from '../components/ColorSwitch';
import { COLORS } from '../utilities';

import type { Colors, RootStackScreenProps } from '../types';

type ToggledColors = {
  [index: string]: Colors;
};

const AddNewPaletteModal = ({ navigation }: RootStackScreenProps) => {
  const [paletteName, setPaletteName] = React.useState('');
  const [toggledColors, setToggledColors] = React.useState<ToggledColors | {}>(
    {},
  );

  const handleColorToggle = ({ colorName, hexCode }: Colors) => {
    const newColors = { ...toggledColors } as ToggledColors
    if (colorName in newColors) {
      delete newColors[colorName];
    } else {
      newColors[colorName] = { colorName, hexCode };
    }
    setToggledColors(newColors)
  };

  const isColorSelected = React.useCallback(
    (colorName: string) => {
      return colorName in toggledColors
    },
    [toggledColors],
  );

  const submitPalette = () => {
    navigation.navigate("Main", { screen: 'Home', params: { newPalette: { paletteName, colors: Object.values(toggledColors) } } })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={COLORS}
        keyExtractor={item => item.colorName}
        extraData={toggledColors}
        style={styles.list}
        renderItem={({ item }) => (
          <ColorSwitch
            color={item}
            value={isColorSelected(item.colorName)}
            onChange={handleColorToggle}
          />
        )}
        ListHeaderComponent={() => <View style={styles.header}>
          <Text style={styles.text}>Name of your new color palette</Text>
          <TextInput
            style={styles.textInput}
            value={paletteName}
            onChangeText={setPaletteName}
            placeholder="Palette Name"
          />
        </View>}
        stickyHeaderIndices={[0]}

      />

      <TouchableOpacity style={styles.button} onPress={submitPalette}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  header: {
    backgroundColor: 'white',
    paddingBottom: 10
  },
  text: { color: 'black', padding: 2 },
  textInput: {
    margin: 4,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    height: 30,
  },
  list: {},
  button: {
    margin: 10,
    height: 30,
    backgroundColor: 'darkgreen',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
  },
});

export default AddNewPaletteModal;

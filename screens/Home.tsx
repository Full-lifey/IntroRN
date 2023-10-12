import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { COLOR_PALETTES } from '../utilities';
import PalettePreview from '../components/PalettePreview';

import type { ColorPalette, MainStackScreenProps } from '../types';

const Home = ({ navigation, route }: MainStackScreenProps) => {
  const [fetchedPalettes, setFetchedPalettes] = React.useState(COLOR_PALETTES);
  const [palettes, setPalettes] = React.useState(COLOR_PALETTES);
  const [savedPalettes, setSavedPalettes] = React.useState<ColorPalette[]>([])
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleFetchPalettes = React.useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.vercel.app/palettes',
    );
    const newFetchedPalettes = await result.json();
    if (result.ok) {
      setFetchedPalettes(newFetchedPalettes);
    }
  }, []);

  React.useEffect(() => {
    handleFetchPalettes();
  }, [handleFetchPalettes]);

  React.useEffect(() => {
    setPalettes([...savedPalettes, ...fetchedPalettes])
  }, [savedPalettes, fetchedPalettes])

  const handleRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    await handleFetchPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [handleFetchPalettes]);

  React.useEffect(() => {
    if (route.params?.newPalette) {
      const newPalette = route.params.newPalette
      setSavedPalettes(prevState => ([...prevState, newPalette]))
    }
  }, [route])

  return (
    <View style={styles.container}>
      <FlatList
        data={palettes}
        renderItem={({ item }) => (
          <PalettePreview
            palette={item}
            onPress={() => {
              navigation.navigate('Main', {
                screen: 'ColorPalette',
                params: item,
              });
            }}
          />
        )}
        keyExtractor={item => item.paletteName}
        style={styles.list}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('AddNewPaletteModal')}>
            <Text>Add a Palette</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  list: {
    backgroundColor: 'white',
  },
});

export default Home;

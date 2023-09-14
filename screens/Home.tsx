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

import type { CompositeScreenProps } from '@react-navigation/native';
import type { MainStackParamList, RootStackParamList } from '../types';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Home = ({ navigation }: Props) => {
  const [palettes, setPalettes] = React.useState(COLOR_PALETTES);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleFetchPalettes = React.useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.vercel.app/palettes',
    );
    const fetchedPalettes = await result.json();
    if (result.ok) {
      setPalettes(fetchedPalettes);
    }
  }, []);

  React.useEffect(() => {
    handleFetchPalettes();
  }, [handleFetchPalettes]);

  const handleRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    await handleFetchPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [handleFetchPalettes]);

  return (
    <View style={styles.container}>
      <FlatList
        data={palettes}
        renderItem={({ item }) => (
          <PalettePreview
            palette={item}
            onPress={() => {
              navigation.navigate('MainStack', {
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

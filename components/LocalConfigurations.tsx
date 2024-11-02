import React from 'react';
import { useAppSelector } from '../state/hooks';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import ConfigSummaryCard from './ConfigSummaryCard';

const LocalConfigurations: React.FC = () => {
  const configurations = useAppSelector((state) => state.investment.configurations);

  const getNumColumns = () => {
    const screenWidth = Dimensions.get('window').width;
    if (screenWidth < 600) return 1;
    if (screenWidth < 900) return 2;
    if (screenWidth < 1200) return 3;
    return 4;
  };
  console.log('COLS', getNumColumns(), 'CONF', configurations);

  return (
    <FlatList
      data={configurations}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ConfigSummaryCard
          label={item.label}
          tags={item.tags}
          dateCreated={item.dateCreated}
          illustrationCount={item.illustrations.length}
          onPress={() => {}}
        />
      )}
      numColumns={getNumColumns()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default LocalConfigurations;

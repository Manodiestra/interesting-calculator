import React from 'react';
import { useAppSelector } from '../state/hooks';
import { StyleSheet, FlatList, Dimensions, View } from 'react-native';
import ConfigSummaryCard from './ConfigSummaryCard';
import { FAB, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

const LocalConfigurations: React.FC = () => {
  const theme = useTheme();
  const configurations = useAppSelector((state) => state.investment.configurations);
  const router = useRouter();

  const getNumColumns = () => {
    const screenWidth = Dimensions.get('window').width;
    if (screenWidth < 600) return 1;
    if (screenWidth < 900) return 2;
    if (screenWidth < 1200) return 3;
    return 4;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondaryContainer }]}>
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
        contentContainerStyle={styles.listContainer}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => router.push('./AddInterestConfigurationForm')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default LocalConfigurations;

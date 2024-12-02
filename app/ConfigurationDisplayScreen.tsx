import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { useLocalSearchParams } from 'expo-router';
import { useAppSelector } from '@/state/hooks';
import { selectOneInvestmentConfig } from '@/state/slices/investmentConfigSlice';

const ConfigurationDisplayScreen: React.FC = () => {
  const theme = useTheme();
  const { configurationIndex } = useLocalSearchParams();
  const configuration = useAppSelector((state) => selectOneInvestmentConfig(state, Number(configurationIndex)));
  console.log('Configuration', configurationIndex, configuration);
  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: theme.colors.background,
    backgroundGradientTo: theme.colors.background,
    color: (opacity = 1) => theme.colors.primary,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title}>{configuration.label}</Text>
      {configuration.illustrations.map((illustration, index) => (
        <View key={index} style={styles.chartContainer}>
          <Text style={styles.chartTitle}>{illustration.label}</Text>
          <LineChart
            data={{
              labels: ['Start', 'End'],
              datasets: [
                {
                  data: [illustration.principleInvestment, illustration.principleInvestment * (1 + illustration.interestRate / 100)],
                },
              ],
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default ConfigurationDisplayScreen;
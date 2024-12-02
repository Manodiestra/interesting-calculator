import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { useLocalSearchParams } from 'expo-router';
import { useAppSelector } from '@/state/hooks';
import { selectOneInvestmentConfig } from '@/state/slices/investmentConfigSlice';
import { Configuration, InvestmentIllustration } from '@/types/illustrations';

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

  const calculateCompoundInterest = (
    principle: number,
    rate: number,
    time: number,
    frequency: 'continuously' | 'daily' | 'monthly' | 'quarterly' | 'annually'
  ): number => {
    const n = {
      continuously: Infinity,
      daily: 365,
      monthly: 12,
      quarterly: 4,
      annually: 1,
    }[frequency];

    if (n === Infinity) {
      return principle * Math.exp(rate * time);
    } else {
      return principle * Math.pow(1 + rate / n, n * time);
    }
  };

  const getDataPoints = (illustration: InvestmentIllustration) => {
    const { principleInvestment, interestRate, investmentDuration, investmentDurationUnit, compoundingFrequency } = illustration;
    const durationInYears = investmentDurationUnit === 'years' ? investmentDuration : investmentDuration / 12;
    const dataPoints = [];
    for (let i = 0; i <= durationInYears; i++) {
      dataPoints.push(calculateCompoundInterest(principleInvestment, interestRate / 100, i, compoundingFrequency));
    }
    return dataPoints;
  };

  const memoizedData = useMemo(() => {
    return configuration.illustrations.map((illustration) => getDataPoints(illustration));
  }, [configuration]);

  const generateLabels = (dataLength: number) => {
    const maxLabels = 8;
    const step = Math.ceil(dataLength / maxLabels);
    return Array.from({ length: dataLength }, (_, i) => (i % step === 0 ? `${i}` : ''));
  };

  const memoizedLabels = useMemo(() => {
    return configuration.illustrations.map((_, index) => generateLabels(memoizedData[index].length));
  }, [memoizedData]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title}>{configuration.label}</Text>
      {configuration.illustrations.map((illustration, index) => (
        <View key={index} style={styles.chartContainer}>
          <Text style={styles.chartTitle}>{illustration.label}</Text>
          <LineChart
            data={{
              labels: memoizedLabels[index],
              datasets: [
                {
                  data: memoizedData[index],
                },
              ],
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
          />
          <Text style={styles.unitLabel}>Years</Text>
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
  unitLabel: {
    textAlign: 'center',
    fontSize: 8,
    color: 'gray',
  },
});

export default ConfigurationDisplayScreen;
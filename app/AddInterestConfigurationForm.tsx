import React from 'react';
import { useForm } from 'react-hook-form';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addConfiguration } from '../state/slices/investmentConfigSlice';
import { useRouter } from 'expo-router';
import { Configuration, InvestmentIllustration } from '../types/illustrations';
import FormTextInput from '../components/FormTextInput';

const AddInterestConfigurationForm: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data: {
    label: string;
    principleInvestment: number;
    interestRate: number;
    investmentDuration: number;
    investmentDurationUnit: 'years' | 'months';
    compoundingFrequency: 'continuously' | 'daily' | 'monthly' | 'quarterly' | 'annually';
  }) => {
    const newConfiguration: Configuration = {
      label: data.label,
      dateCreated: new Date(),
      color: '#000',
      tags: [],
      illustrations: [
        {
          principleInvestment: data.principleInvestment,
          interestRate: data.interestRate,
          investmentDuration: data.investmentDuration,
          investmentDurationUnit: data.investmentDurationUnit,
          compoundingFrequency: data.compoundingFrequency,
        } as InvestmentIllustration,
      ],
    };

    dispatch(addConfiguration(newConfiguration));
    router.push('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <FormTextInput
          control={control}
          label="Label"
          name="label"
          defaultValue=""
          placeholder="Configuration Label"
        />

        <FormTextInput
          control={control}
          label="Principal Investment"
          name="principleInvestment"
          defaultValue=""
          placeholder="Principal Investment"
          keyboardType="numeric"
          validation={{
            required: 'Principal investment is required',
            pattern: { value: /^[0-9]*$/, message: 'Enter a valid number' },
          }}
        />

        <FormTextInput
          control={control}
          label="Interest Rate (%)"
          name="interestRate"
          defaultValue=""
          placeholder="Interest Rate"
          keyboardType="numeric"
          validation={{
            required: 'Interest rate is required',
            pattern: { value: /^[0-9]*$/, message: 'Enter a valid number' },
          }}
        />

        <FormTextInput
          control={control}
          label="Investment Duration"
          name="investmentDuration"
          defaultValue=""
          placeholder="Investment Duration"
          keyboardType="numeric"
          validation={{
            required: 'Investment duration is required',
            pattern: { value: /^[0-9]*$/, message: 'Enter a valid number' },
          }}
        />

        <FormTextInput
          control={control}
          label="Investment Duration Unit"
          name="investmentDurationUnit"
          defaultValue="years"
          placeholder="years or months"
        />

        <FormTextInput
          control={control}
          label="Compounding Frequency"
          name="compoundingFrequency"
          defaultValue="annually"
          placeholder="e.g., daily, monthly"
        />

        <Button title="Add Configuration" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  container: {
    flex: 1,
  },
});

export default AddInterestConfigurationForm;

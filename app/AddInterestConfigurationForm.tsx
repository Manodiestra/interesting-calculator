import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addConfiguration } from '../state/slices/investmentConfigSlice';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Menu, Button, Text, useTheme } from 'react-native-paper';
import { Configuration, InvestmentIllustration } from '../types/illustrations';
import FormTextInput from '../components/FormTextInput';
import { toTitleCase } from '../utils/formatters';

const AddInterestConfigurationForm: React.FC = () => {
  const theme = useTheme();
  const { control, handleSubmit, setValue, watch } = useForm<InvestmentIllustration>({
    defaultValues: {
      label: '',
      investmentDurationUnit: 'years',
      compoundingFrequency: 'annually',
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const [durationUnitVisible, setDurationUnitVisible] = useState(false);
  const [frequencyVisible, setFrequencyVisible] = useState(false);

  const investmentDurationUnit = watch("investmentDurationUnit", "years");
  const compoundingFrequency = watch("compoundingFrequency", "annually");

  const onSubmit: SubmitHandler<InvestmentIllustration> = data => {
    const newConfiguration: Configuration = {
      label: data.label,
      dateCreated: new Date().toISOString(),
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
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: theme.colors.secondaryContainer }]}>
      <View style={styles.container}>
        <FormTextInput
          control={control}
          label="Title"
          name="label"
          defaultValue=""
          placeholder="Illustration title"
        />

        <FormTextInput
          control={control}
          label="Principal"
          name="principleInvestment"
          defaultValue=""
          placeholder="Principal investment"
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
          placeholder="Interest rate"
          keyboardType="numeric"
          validation={{
            required: 'Interest rate is required',
            pattern: { value: /^[0-9]*$/, message: 'Enter a valid number' },
          }}
        />

        <View style={styles.row}>
          <View style={styles.durationInput} >
            <FormTextInput
              control={control}
              label="Duration"
              name="investmentDuration"
              defaultValue=""
              placeholder="Investment duration"
              keyboardType="numeric"
              validation={{
                required: 'Investment duration is required',
                pattern: { value: /^[0-9]*$/, message: 'Enter a valid number' },
              }}
            />
          </View>
          <View style={styles.unitPickerContainer}>
            <Text style={styles.label}>Unit</Text>
            <Menu
              visible={durationUnitVisible}
              onDismiss={() => setDurationUnitVisible(false)}
              anchor={
                <Button
                  onPress={() => setDurationUnitVisible(true)}
                  icon={({ size, color }) => (
                    <MaterialIcons name="arrow-drop-down" size={size} color={color} />
                  )}
                  mode='outlined'
                >
                  {investmentDurationUnit}
                </Button>
              }
            >
              <Menu.Item onPress={() => { setValue("investmentDurationUnit", "years"); setDurationUnitVisible(false); }} title="Years" />
              <Menu.Item onPress={() => { setValue("investmentDurationUnit", "months"); setDurationUnitVisible(false); }} title="Months" />
            </Menu>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Compounding Frequency</Text>
          <Menu
            visible={frequencyVisible}
            onDismiss={() => setFrequencyVisible(false)}
            anchor={
              <Button
                onPress={() => setFrequencyVisible(true)}
                icon={({ size, color }) => (
                  <MaterialIcons name="arrow-drop-down" size={size} color={color} />
                )}
                mode='outlined'
              >
                {toTitleCase(compoundingFrequency)}
              </Button>
            }
          >
            <Menu.Item onPress={() => { setValue("compoundingFrequency", "continuously"); setFrequencyVisible(false); }} title="Continuously" />
            <Menu.Item onPress={() => { setValue("compoundingFrequency", "daily"); setFrequencyVisible(false); }} title="Daily" />
            <Menu.Item onPress={() => { setValue("compoundingFrequency", "monthly"); setFrequencyVisible(false); }} title="Monthly" />
            <Menu.Item onPress={() => { setValue("compoundingFrequency", "quarterly"); setFrequencyVisible(false); }} title="Quarterly" />
            <Menu.Item onPress={() => { setValue("compoundingFrequency", "annually"); setFrequencyVisible(false); }} title="Annually" />
          </Menu>
        </View>

        <Button mode='contained' onPress={handleSubmit(onSubmit)}>
          Add Configuration
        </Button>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  durationInput: {
    flex: 0.6,
    marginRight: 10,
  },
  unitPickerContainer: {
    flex: 0.4,
  },
  pickerContainer: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default AddInterestConfigurationForm;

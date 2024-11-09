import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

interface FormTextInputProps {
  control: any;
  label: string;
  name: string;
  defaultValue: string;
  placeholder: string;
  validation?: object;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  control,
  label,
  name,
  defaultValue,
  placeholder,
  validation,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={validation}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              mode="outlined"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType}
              error={!!error}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default FormTextInput;

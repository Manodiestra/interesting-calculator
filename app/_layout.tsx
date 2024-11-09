import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { Stack, Slot } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../state/store';

export default function Layout() {
  const theme = useTheme();
  return (
    <Provider store={store}>
      <PaperProvider>
      {Platform.OS === 'web' ? (
          <Slot />
        ) : (
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: theme.colors.primary },
              headerTintColor: theme.colors.onPrimary,
            }}
          />
        )}
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

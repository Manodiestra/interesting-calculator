import React from 'react';
import { Platform } from 'react-native';
import { Stack, Slot } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../state/store';

export default function Layout() {
  return (
    <Provider store={store}>
      {Platform.OS === 'web' ? (
        <Slot />
      ) : (
        <Stack />
      )}
    </Provider>
  );
}

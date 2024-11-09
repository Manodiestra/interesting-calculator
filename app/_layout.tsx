import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { Stack, Slot } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../state/store';

const ThemedBackground: React.FC = ({ children }) => {
  const theme = useTheme();
  console.log('THEME,', theme);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {children}
    </View>
  );
};

export default function Layout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <ThemedBackground>
          {Platform.OS === 'web' ? <Slot /> : <Stack />}
        </ThemedBackground>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import LocalConfigurations from "../components/LocalConfigurationsScreen";

if (__DEV__) {
  require("../ReactotronConfig");
}

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "Configurations" }} />
      <View style={styles.container}>
        <LocalConfigurations />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

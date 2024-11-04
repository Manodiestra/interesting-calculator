import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Text } from "react-native-paper";
import LocalConfigurations from "../components/LocalConfigurations";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "Configurations" }} />
      <View style={styles.container}>
        <Text> TEST TEXT </Text>
        <LocalConfigurations />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

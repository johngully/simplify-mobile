import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, typography, buttons, containers, text } from "../styles";

export default function TransactionsScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Transactions</Text>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  ...containers,
  ...buttons,
  ...text
});


import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, typography, buttons, containers, text } from "../styles";

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>💸 SIMPLIFY</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => { props.navigation.navigate("Connect") }}>
          <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  ...containers,
  ...buttons,
  ...text
});


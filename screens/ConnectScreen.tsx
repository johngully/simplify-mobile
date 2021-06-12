import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { all } from "../styles";

export default function ConnectScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Connect to your bank</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => { props.navigation.navigate("Schedule") }}>
          <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create(all);

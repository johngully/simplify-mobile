import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, typography, buttons, containers, text } from "../styles";


const bankLinkTokenQuery = gql`
  query($id: ID!) { 
    bankLinkToken(userId: $id) 
  }
`;

export default function HomeScreen(props) {
  const { loading, error, data } = useQuery(bankLinkTokenQuery, { variables: { id: "123-test-user-id" } });

  let pendingText = "Loading..."
  const alternateView = <View style={styles.containerWithHeaderOffset}><Text style={styles.textTitle}>{ pendingText }</Text></View>
  if (loading) {
    return alternateView;
  }
  if (error) { 
    pendingText = "Error :("
    return alternateView
  }
  
  const onGetStartedPress = async () => {
    const bankLinkToken = data.bankLinkToken; // await fetch();
    return props.navigation.navigate("Connect", { bankLinkToken });
  };
  
  const onDeveloperPress = async () => {
    const bankLinkToken = data.bankLinkToken; // await fetch();
    return props.navigation.navigate("Developer", { bankLinkToken });
  };

  return (
    <View style={styles.containerWithHeaderOffset}>
      <Text style={styles.textTitle}>💸 SIMPLIFY</Text>
      <TouchableOpacity style={styles.button} onPress={onGetStartedPress}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGhostButton} onPress={onDeveloperPress}>
        <Text style={styles.buttonGhostButtonText}>developer</Text>
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


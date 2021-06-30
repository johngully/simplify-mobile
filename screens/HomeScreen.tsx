import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, typography, buttons, containers, text } from "../styles";
import { getTransactionsNavigationVariables } from "../utils/navigation";

const bankLinkTokenQuery = gql`
  query($id: ID!) { 
    bankLinkToken(userId: $id) 
  }
`;

export default function HomeScreen(props) {
  const transactionVariables = getTransactionsNavigationVariables();
  const { loading, error, data } = useQuery(bankLinkTokenQuery, { variables: { id: "123-test-user-id" } });

  if (loading) return <View style={styles.containerWithHeaderOffset}><Text style={styles.textTitle}>Loading ...</Text></View>
  if (error) return <View style={styles.containerWithHeaderOffset}><Text style={styles.textTitle}>Error:</Text><Text>{JSON.stringify(error)}</Text></View>
  
  const onNavigateToTransactions = () => {
    return props.navigation.navigate("Transactions", transactionVariables);
  }
  const onNavigateToConnect = () => {    
    const bankLinkToken = data.bankLinkToken; // await fetch();
    return props.navigation.navigate("Connect", { bankLinkToken });
  };
  
  const onNavigateToDeveloper = () => {
    const bankLinkToken = data.bankLinkToken; // await fetch();
    return props.navigation.navigate("Developer", { bankLinkToken });
  };

  function renderNextScreenButton () {
    if (transactionVariables.accessToken) {
      return (
        <TouchableOpacity style={styles.button} onPress={onNavigateToTransactions}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.button} onPress={onNavigateToConnect}>
          <Text style={styles.buttonText}>Get connected</Text>
        </TouchableOpacity>
      );
    }
  }

  function renderDeveloperButton() {
    const isDev = Constants.manifest.extra?.environment.development;
    if (isDev) {
      return (
        <TouchableOpacity style={styles.buttonGhostButton} onPress={onNavigateToDeveloper}>
          <Text style={styles.buttonGhostButtonText}>developer</Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <View style={styles.containerWithHeaderOffset}>
      <Text style={styles.textTitle}>💸 SIMPLIFY</Text>
      { renderNextScreenButton() }
      { renderDeveloperButton() }
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  ...containers,
  ...buttons,
  ...text
});


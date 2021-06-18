import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useApolloClient, useLazyQuery, useQuery, gql } from "@apollo/client";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { all } from "../styles";

const styles = StyleSheet.create(all);
const institutionId = "ins_109508";
let accessToken = "";
const accounts = [];

const now = new Date();
const endDate = now.toISOString().slice(0, 10);
const startDate = new Date(now.setDate(now.getDate()-30)).toISOString().slice(0, 10);

const bankLinkQuery = gql`
  query($id: ID!) { 
    bankLinkToken(userId: $id) 
  }
`;

const bankSandboxAccessTokenQuery = gql`
query($institutionId: String!) { 
  bankSandboxAccessToken(institutionId: $institutionId) 
}
`;

const accountsQuery = gql`
  query($accessToken: String!) { 
    accounts(accessToken: $accessToken) {
      id,
      accountNumber,
      accountType,
      name,
      description,
    }
  }
`;


export default function DeveloperScreen(props) {
  // const client = useApolloClient();
  const bankLinkVariables = { variables: { id: "123-test-user-id" } };
  const bankLinkTokenPromise = useQuery(bankLinkQuery, bankLinkVariables);
  const [ onAuthorize, bankAccessTokenPromise ] = useLazyQuery(bankSandboxAccessTokenQuery);
  const [ onAccounts, accountsPromise ] = useLazyQuery(accountsQuery);

  
  const authorize = () => {
    const bankSandboxAccessTokenVariables = { variables: { institutionId } };
    onAuthorize(bankSandboxAccessTokenVariables);
  };

  const navigateToConnect = () => {
    return props.navigation.navigate("Connect", { bankLinkToken });
  };

  const getAccounts = () => {
    const accountsVariables = { variables: { accessToken } };
    onAccounts(accountsVariables);
  };

  const navigateToTransactions = () => {
    const accountIds = accounts.map(account => account.id);
    return props.navigation.navigate("Transactions", { accessToken, accountIds, startDate, endDate });
  };

  if (bankLinkTokenPromise.loading) return <View><Text>Loading ...</Text></View>
  if (bankLinkTokenPromise.error) return <View><Text>Error</Text></View>
  const bankLinkToken = bankLinkTokenPromise.data ? bankLinkTokenPromise.data.bankLinkToken : ""
  
  if (bankAccessTokenPromise.loading) return <View><Text>Authorize Loading ...</Text></View>
  if (bankAccessTokenPromise.error) return <View><Text>Authorize Error: {JSON.stringify(bankAccessTokenPromise.error)}</Text></View>
  if (bankAccessTokenPromise.data) accessToken = bankAccessTokenPromise.data.bankSandboxAccessToken;
  // console.log("Access Token: ", accessToken);

  if (accountsPromise.loading) return <View><Text>Accounts Loading ...</Text></View>
  if (accountsPromise.error) return <View><Text>Accounts Error: {JSON.stringify(accountsPromise.error)}</Text></View>
  if (accountsPromise.data) accounts.push(...accountsPromise.data.accounts);
  
  
  return (
    <View style={styles.containerWithHeaderOffset}>
      <Text>bankLinkToken:</Text>
      <Text>{ bankLinkToken }</Text>
      <Text>accessToken:</Text>
      <Text>{ accessToken }</Text>
      <View style={{
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-around"
      }}>

        <TouchableOpacity style={styles.button} onPress={authorize}>
            <Text style={styles.buttonText}>Authorize (fake)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToConnect}>
            <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={getAccounts}>
            <Text style={styles.buttonText}>Get Accounts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToTransactions}>
            <Text style={styles.buttonText}>Transactions</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}



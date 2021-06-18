import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlaidLink from '@burstware/expo-plaid-link';
import { all } from "../styles";
import { useLazyQuery, gql } from "@apollo/client";

const accountIds = [];

export default function App(props) {
  const linkToken = props.route.params.bankLinkToken;  
  const bankAccessTokenQuery = gql`
    query($token: String!) { 
      bankAccessToken(publicToken: $token) 
    }
  `;
  
  const [ success, bankAccessTokenPromise ] = useLazyQuery(bankAccessTokenQuery);

  if (bankAccessTokenPromise.loading) return <View><Text>Loading ...</Text></View>
  if (bankAccessTokenPromise.error) return <View><Text>Error {JSON.stringify(bankAccessTokenPromise.error)}</Text></View>
  if (bankAccessTokenPromise.data) {
    const accessToken = bankAccessTokenPromise.data.bankAccessToken;
    const now = new Date();
    const endDate = now.toISOString().slice(0, 10);
    const startDate = new Date(now.setDate(now.getDate()-30)).toISOString().slice(0, 10);
    props.navigation.navigate("Transactions", { accessToken, accountIds, startDate, endDate });
  }

  function onExit(error) {
    console.error("onExit:\n", error);
    // TODO: Add better error handling here ...
  };

  async function onSuccess(response) {
    const token = response.publicToken;
    const accounts = response.metadata.accounts;
    accountIds.push(...accounts.map(account => account._id));
    const variables = { variables: { token }};
    success(variables);
  };

  return (
    <PlaidLink
      linkToken={linkToken}
      onExit={onExit}
      onSuccess={onSuccess}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create(all);

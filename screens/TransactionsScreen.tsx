import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import { all, baseUnit } from "../styles";

export default function TransactionsScreen(props) {
  const styles = StyleSheet.create(all);
  const { accessToken, accountIds, startDate, endDate } = props.route.params;
  const transactions = [];
  
  const transactionsQuery = gql`
    query($accessToken: String!, $accountIds: [String]!, $startDate: String!, $endDate: String!) {
      transactions(accessToken: $accessToken, accountIds: $accountIds, startDate: $startDate, endDate: $endDate) {
        id,
        accountId,
        timestamp,
        pending,
        amount,
        currency,
        description,
        name,
        merchant,
        note,
        envelope {
          id,
          targetBalance,
          currentBalance,
          name,
          description
        },
        created,
        updated,
      }
    }
  `;
  const id = "123-test-user-id";
  const transactionVariables = { variables: { accessToken, accountIds, startDate, endDate }};
  const { loading, error, data } = useQuery(transactionsQuery, transactionVariables);

  if (loading) return <View><Text>Transactions Loading ...</Text></View>
  if (error) return <View><Text>Transactions Error: {JSON.stringify(error)}</Text></View>

  transactions.push(...data.transactions);
  
  const transactionRenderItem = ({ item }) => (
    <View style={{
      padding: baseUnit,
      paddingVertical: baseUnit*2,
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "stretch"
    }}>
      <View>
        <Text style={{ fontWeight: "bold"}}>{item.name}</Text>
        <Text>{item.merchant}</Text>
      </View>
      <View>
        <Text>${item.amount} {item.currency}</Text>
        <Text style={{ textAlign: "right" }}>{ item.pending }</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList style={{ alignSelf: "stretch", padding: baseUnit }} data={transactions} renderItem={transactionRenderItem} keyExtractor={ transaction => transaction.id}></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}



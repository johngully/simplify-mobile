import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import HomeScreen from "./screens/HomeScreen";
import DeveloperScreen from "./screens/DeveloperScreen";
import ConnectScreen from "./screens/ConnectScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import appConfig from "./app.json";
import Constants from "expo-constants";

const { name, version } = Constants.manifest;
const uri = Constants.manifest.extra.serviceEndpoint;
const cache = new InMemoryCache();
const client = new ApolloClient({ uri, cache, name, version });

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
          <Stack.Screen name="Developer" component={DeveloperScreen}></Stack.Screen>
          <Stack.Screen name="Connect" component={ConnectScreen}></Stack.Screen>
          <Stack.Screen name="Transactions" component={TransactionsScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;

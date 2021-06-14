
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./screens/HomeScreen";
import ConnectScreen from "./screens/ConnectScreen";
import TransactionsScreen from "./screens/TransactionsScreen";

// Configure navigation settings for screens
HomeScreen.navigationOptions = () => ({
  headerShown: false
});

ConnectScreen.navigationOptions = () => ({
  headerShown: false
});

TransactionsScreen.navigationOptions = () => ({
  headerShown: false
});

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Connect: ConnectScreen,
  Transactions: TransactionsScreen,
});

export default createAppContainer(AppNavigator);
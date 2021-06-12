
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./screens/HomeScreen";
import ConnectScreen from "./screens/ConnectScreen";

// Configure navigation settings for screens
HomeScreen.navigationOptions = () => ({
  headerShown: false
});

ConnectScreen.navigationOptions = () => ({
  headerShown: false
});

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Connect: ConnectScreen,
});

export default createAppContainer(AppNavigator);
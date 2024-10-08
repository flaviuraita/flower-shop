import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Orders from './src/screens/Menu/Orders';
import Stock from './src/screens/Menu/Stock';
import Settings from './src/screens/Menu/Settings';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './src/screens/Landing';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Menu = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Stock" component={Stock} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen name= "Landing" component={Landing}/>
          <Stack.Screen name= "Menu" component={Menu}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

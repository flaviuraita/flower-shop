import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await fetch('http://demo9812995.mockable.io/flowers');
    const json = await response.json();
    setOrders(json);
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {getShops} from "./src/lib/firebase"
import {Shop} from "./src/types/shop"

export default function App() {
  const [shops, setShops] = useState<Shop[]>([])

  // The first arugment is called when the second argument is changed.
  // But since it is an empty array in this case, the first argument
  // is called only once when the screen is mounted.
  useEffect(() => {
    getFirebaseItems();
  }, [])

  const getFirebaseItems = async() => {
    const shops = await getShops()
    // setShops(shops) is called after snapshot is retrieved, because this is an async function.
    // If this is not were an async function, setShops(shops) is executed while/before snapshot is retrieved
    setShops(shops)
  }

  const shopItems = shops.map((shop, index) => (
    <View style = {{margin: 10}} key={index.toString()}>
      <Text>{shop.name}</Text>
      <Text>{shop.place}</Text>
    </View>
  ))

  return (
    <View style={styles.container}>
      {shopItems}
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

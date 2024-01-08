import { getFlowers } from "../api/flowerService";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const FlowerItem = ({flower}) => {
  return (
    <View style={styles.flowerItemWrapper}>
      <Text style={styles.flowerItemLarge}>{flower.name}</Text>
      <Text style={styles.flowerItem}>{flower.number_in_stock}</Text>
      <Text style={styles.flowerItem}>{flower.price}</Text>
      <Image
        source={{uri: flower.image_url}}
        style={{...styles.flowerItemLarge, width: 100, height: 100, borderRadius: 15}}
      />
    </View>
  )
}

export default function FlowerStock() {
  const [flowers, setFlowers] = useState([])

  const setFlowerState = async () => {
    const flowers = await getFlowers();
    setFlowers(flowers);
  }

  useEffect(() => {
    setFlowerState();
  }, [])

  return (
    <>
      {flowers && <FlatList
        data={flowers}
        renderItem={((flower) => <FlowerItem flower={flower.item}/>)}
        keyExtractor={flower => flower.id}
      />}
    </>
  )
}

const styles = StyleSheet.create({
  flowerItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  flowerItem: {
    flex: 1
  },
  flowerItemLarge: {
    flex: 2
  },
})

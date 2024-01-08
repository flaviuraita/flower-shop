import { getFlowers } from "../api/flowerService";
import { useEffect, useState } from "react";
import { Image, SectionList, StyleSheet, Text, View } from "react-native";

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
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    setFlowerState();
  }, [])

  const setFlowerState = async () => {
    const flowers = await getFlowers();
    const processedFlowers = processFlowersData(flowers);

    setFlowers(processedFlowers);
  }

  const processFlowersData = (flowers) => {
    const processedFlowers = [];

    Object.keys(flowers).map(flower => {
      const index = processedFlowers.findIndex(f => f?.flower)
      if (index > 0) {
        processedFlowers[index].data.push(flowers[flower])
      } else {
        processedFlowers.push({
          title: flower,
          data: flowers[flower]
        })
      }
    });

    return processedFlowers;
  }

  return (
    <>
      {flowers && <SectionList
        sections={flowers}
        renderItem={((flower) => <FlowerItem flower={flower.item}/>)}
        keyExtractor={flower => flower.id}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title} flowers</Text>
        )}
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
  header: {
    textTransform: 'capitalize',
  }
})

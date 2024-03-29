import { useEffect, useState } from "react"
import { StyleSheet, Text, Image, FlatList, Pressable } from "react-native"

const statuses = ['received', 'pending', 'delivered']

const Order = ({order}) => {
  const [status, setStatus] = useState(order.item.status)

  const updateStatus = async () => {
    const updatedStatus = statuses[statuses.findIndex(s => status === s) + 1] || statuses[0]
    await requestUpdateStatus(updatedStatus);
    setStatus(updatedStatus)
  }

  const requestUpdateStatus = async (status: string) => {
    const headers = {
      "Content-Type": "application/json"
    }

    const body = {
      order: {
        status
      }
    }

    await fetch(`localhost:3000/api/v1/orders/${order.item.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    })
  }

  return (
    <Pressable style={styles.order} onPress={updateStatus}>
      <Text>{order.item.deliver_to.name}</Text>
      <Text>{order.item.flower.name}</Text>
      <Text>{order.item.flower.price}</Text>
      <Text>{status}</Text>
      <Image
        source={{uri: order.item.flower.image_url}}
        style={{width: 100, height: 100, borderRadius: 15}}
      />
    </Pressable>
  )
}

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await fetch('localhost:3000/api/v1/orders');
    const json = await response.json();

    setOrders(json);
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <>
      <Text>Orders</Text>
      {orders && <FlatList
        data={orders}
        renderItem={((order) => <Order order={order}/>)}
        keyExtractor={order => order.id}
      />}
    </>
  )
}

const styles = StyleSheet.create({
  order: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  }
})

export default OrderList;

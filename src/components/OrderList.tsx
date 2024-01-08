import { useEffect, useState } from "react"
import { StyleSheet, Text, Image, FlatList, Pressable } from "react-native"
import { getOrders, updateOrderStatus } from "../api/orderService"

const statuses = ['received', 'pending', 'delivered']

const Order = ({order}) => {
  const [status, setStatus] = useState(order.status)

  const updateStatus = async () => {
    const updatedStatus = statuses[statuses.findIndex(s => status === s) + 1] || statuses[0]
    await updateOrderStatus(order.id, updatedStatus);
    setStatus(updatedStatus)
  }

  return (
    <Pressable style={styles.order} onPress={updateStatus}>
      <Text style={styles.orderItem}>{order.deliver_to.name}</Text>
      <Text style={styles.orderItem}>{status}</Text>
      <Image
        source={{uri: order.flower.image_url}}
        style={{...styles.orderItem, width: 100, height: 100, borderRadius: 15}}
      />
    </Pressable>
  )
}

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const setOrdersState = async () => {
    const orders = await getOrders();
    setOrders(orders);
  }

  useEffect(() => {
    setOrdersState()
  }, [])

  return (
    <>
      {orders && <FlatList
        data={orders}
        renderItem={((order) => <Order order={order.item}/>)}
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
  },
  orderItem: {
    flex: 1,
  }
})

export default OrderList;

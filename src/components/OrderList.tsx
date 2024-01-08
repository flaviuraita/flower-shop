import { useEffect, useState } from "react"
import { StyleSheet, Text, Image, FlatList, Pressable } from "react-native"
// @ts-ignore
import { API_BASE_URL } from '@env'

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

    await fetch(`${API_BASE_URL}/orders/${order.item.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    })
  }

  return (
    <Pressable style={styles.order} onPress={updateStatus}>
      <Text style={styles.orderItem}>{order.item.deliver_to.name}</Text>
      <Text style={styles.orderItem}>{status}</Text>
      <Image
        source={{uri: order.item.flower.image_url}}
        style={{...styles.orderItem, width: 100, height: 100, borderRadius: 15}}
      />
    </Pressable>
  )
}

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    const json = await response.json();

    setOrders(json);
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <>
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
  },
  orderItem: {
    flex: 1,
  }
})

export default OrderList;

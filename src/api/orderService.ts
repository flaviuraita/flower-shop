// @ts-ignore
import { API_BASE_URL } from '@env'

export const getOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    const json = await response.json();

    return json
  } catch (e) {
    console.log(e);
  }
}

export const updateOrderStatus = async (id, status) => {
  try {
    const headers = {
      "Content-Type": "application/json"
    }

    const body = {
      order: {
        status
      }
    }

    return await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    })
  } catch (e) {
    console.log(e);
  }
}

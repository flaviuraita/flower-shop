// @ts-ignore
import { API_BASE_URL } from '@env'

export const getFlowers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/flowers`);
    const json = await response.json();

    return json
  } catch (e) {
    console.log(e);
  }
}

export const updateFlowerStock = async (id, numberInStock) => {
  try {
    const headers = {
      "Content-Type": "application/json"
    }

    const body = {
      order: {
        number_in_stock: numberInStock
      }
    }

    return await fetch(`${API_BASE_URL}/flowers/${id}/update_stock`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    })
  } catch (e) {
    console.log(e);
  }
}

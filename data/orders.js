import { fetchWithResponse } from "./fetcher"

export function getCart() {
  return fetchWithResponse("cart", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

// export function getCart() {
//   return fetchWithResponse("cart", {
//     headers: {
//       Authorization: `Token ${localStorage.getItem("token")}`,
//     },
//   }).then((response) => {
//     if (response.ok) {
//       return response.json()
//     } else {
//       return {}
//     }
//   })
// }

export function getOrders() {
  return fetchWithResponse("orders", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export function completeCurrentOrder(orderId, payment_id) {
  return fetchWithResponse(`cart/${orderId}/complete`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payment_id }),
  })
}

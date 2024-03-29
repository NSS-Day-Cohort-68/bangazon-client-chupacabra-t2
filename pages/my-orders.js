import { useEffect, useState } from "react"
import CardLayout from "../components/card-layout"
import Layout from "../components/layout"
import Navbar from "../components/navbar"
import Table from "../components/table"
import { getOrders } from "../data/orders"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const headers = ["Order Date", "Total", "Payment Method"]

  useEffect(() => {
    getOrders().then((ordersData) => {
      if (ordersData) {
        setOrders(ordersData)
      }
    })
  }, [])

  // Function to calculate total price of line items for an order
  const calculateTotal = (lineItems) => {
    let totalPrice = 0
    lineItems.forEach((item) => {
      totalPrice += item.product.price
    })
    return totalPrice.toFixed(2) // Adjust to 2 decimal places
  }

  return (
    <>
      <CardLayout title="Your Orders">
        <Table headers={headers}>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.created_date}</td>
              <td>${calculateTotal(order.lineitems)}</td>
              <td>{order.payment?.merchant_name}</td>
            </tr>
          ))}
        </Table>
        <></>
      </CardLayout>
    </>
  )
}

Orders.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}

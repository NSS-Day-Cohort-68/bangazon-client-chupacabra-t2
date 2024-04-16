import { useEffect, useState } from "react"
import Filter from "../../components/filter"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import { ProductCard } from "../../components/product/card"
import { getProducts, getStoreProducts } from "../../data/products"
import { StoreProductCard } from "../../components/store-products/card.js"

export default function StoreProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState("Loading products...")
  const [locations, setLocations] = useState([])

  useEffect(() => {
    getStoreProducts()
      .then((data) => {
        if (data) {
          const locationData = [
            ...new Set(data.map((product) => product.location)),
          ]
          const locationObjects = locationData.map((location) => ({
            id: location,
            name: location,
          }))

          setProducts(data)
          setIsLoading(false)
          setLocations(locationObjects)
        }
      })
      .catch((err) => {
        setLoadingMessage(
          `Unable to retrieve products. Status code ${err.message} on response.`
        )
      })
  }, [])

  if (isLoading) return <p>{loadingMessage}</p>

  return (
    <>
      <div className="columns is-multiline">
        {products.map((product) => (
          <StoreProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  )
}

StoreProducts.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}

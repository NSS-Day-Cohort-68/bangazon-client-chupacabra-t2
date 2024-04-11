import { useEffect, useState } from "react"
import Filter from "../../components/filter"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import { ProductCard } from "../../components/product/card"
import { getProducts } from "../../data/products"
import { StoreProductCard } from "../../components/store-products/card.js"

export default function StoreProducts({ storeId }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState("Loading products...")
  const [locations, setLocations] = useState([])

  useEffect(() => {
    getProducts()=>{}
)

  if (isLoading) return <p>{loadingMessage}</p>

  return (
    <>
      <div className="storeProducts">
        {products.map((product) => {
          ;<StoreProductCard product={product} key={product.id} />
        })}
      </div>
    </>
  )
}

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../../components/layout"
import Navbar from "../../../components/navbar"
import Detail from "../../../components/store/detail"
import { useAppContext } from "../../../context/state"
import { deleteProduct } from "../../../data/products"
import {
  favoriteStore,
  getStoreById,
  unfavoriteStore,
} from "../../../data/stores"
import { StoreProductCard } from "../../../components/store-products/card.js"
import { getUserProfile } from "../../../data/auth.js"

export default function StoreDetail() {
  const router = useRouter()
  const { id } = router.query
  const [store, setStore] = useState({})

  const removeProduct = (productId) => {
    deleteProduct(productId).then(refresh)
  }

  const favorite = () => {
    favoriteStore(id).then(refresh)
  }

  const unfavorite = () => {
    unfavoriteStore(id).then(refresh)
  }

  return (
    <>
      <Detail favorite={favorite} unfavorite={unfavorite} />
      <div className="columns is-multiline">
        {store.products?.map((product) => (
          <StoreProductCard
            product={product}
            key={product.id}
            removeProduct={removeProduct}
          />
        ))}
        {store.products?.length === 0 ? <p>There's no products yet</p> : <></>}
      </div>
    </>
  )
}

StoreDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}

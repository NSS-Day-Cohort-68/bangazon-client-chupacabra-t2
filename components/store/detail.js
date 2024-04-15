import Link from "next/link"
import { StoreProductCard } from "../store-products/card.js"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getStoreById } from "../../data/stores.js"
import { getStoreProducts } from "../../data/products"

export default function Detail({ favorite, unfavorite }) {
  const [store, setStore] = useState({})
  const [storeProducts, setStoreProducts] = useState([])
  // const { profile, setProfile } = useAppContext()
  const [isOwner, setIsOwner] = useState(false)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    getStoreById(id).then((storeData) => {
      if (storeData) {
        setStore(storeData)
        setIsOwner(storeData.is_owner) // Use storeData.is_owner to set isOwner
      }
    })
  }, [id])

  const storeId = store.id

  useEffect(() => {
    if (storeId) {
      getStoreProducts(storeId).then((data) => {
        setStoreProducts(data)
      })
    }
  }, [storeId])

  const ownerButtons = () => {
    return (
      <div className="buttons">
        <Link href={`/stores/${store.id}/edit`}>
          <a className="button is-primary is-inverted">Edit Store</a>
        </Link>
        <Link href="/products/new">
          <a className="button is-primary is-inverted">Add a Product</a>
        </Link>
      </div>
    )
  }
  const userButtons = () => {
    return (
      <>
        {store.is_favorite ? (
          <button
            className="button is-primary is-inverted"
            onClick={unfavorite}
          >
            <span className="icon is-small">
              <i className="fas fa-heart-broken"></i>
            </span>
            <span>Unfavorite Store</span>
          </button>
        ) : (
          <button className="button is-primary is-inverted" onClick={favorite}>
            <span className="icon is-small">
              <i className="fas fa-heart"></i>
            </span>
            <span>Favorite Store</span>
          </button>
        )}
      </>
    )
  }

  return (
    <>
      <section className="hero is-primary mb-3">
        <div className="hero-head">
          <nav className="navbar">
            <div className="navbar-menu">
              <div className="navbar-end">
                <span className="navbar-item">
                  {isOwner ? ownerButtons() : userButtons()}
                </span>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <p className="title">{store.name}</p>
          <p className="subtitle">{store.description}</p>
        </div>
      </section>
      <section>
        <div className="store products list"></div>
        {storeProducts.map((product) => (
          <StoreProductCard product={product} key={product.id} />
        ))}
      </section>
    </>
  )
}

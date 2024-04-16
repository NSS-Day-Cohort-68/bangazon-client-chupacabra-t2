import Link from "next/link"

export function StoreCard({ store, width = "is-half" }) {
  // sellerName = store.seller.customer.user.first_name

  return (
    <div className={`column ${width}`}>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{store.name}</p>
        </header>
        <div className="card-content">
          <p className="content">
            Owner:
            {`${store.seller_info.first_name} ${store.seller_info.last_name}`}
          </p>
          <div className="content">{store.description}</div>
        </div>
        <footer className="card-footer">
          <Link href={`stores/${store.id}`}>
            <a className="card-footer-item">View Store</a>
          </Link>
        </footer>
      </div>
    </div>
  )
}

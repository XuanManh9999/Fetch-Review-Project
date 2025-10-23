import React from 'react'
import './ProductList.css'

const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="product-list-container">
        <h2>🛍️ Products List</h2>
        <div className="loading">⏳ Loading...</div>
      </div>
    )
  }

  return (
    <div className="product-list-container">
      <h2>🛍️ Products List ({products.length})</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
            )}
            <div className="product-info">
              <h3>{product.name}</h3>
              {product.description && (
                <p className="product-description">{product.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList


import React from 'react'
import { ethers } from 'ethers'

const ProductShowcase = ({ products = [], isLoading = false }) => {
  return (
    <div className="product-container">
      {isLoading
        ? 'Loading...'
        : products?.map(product => (
            <div
              key={product.title}
              className="product-card"
              style={{ width: '20%' }}
            >
              <img
                src={product.imageUrl}
                className="image"
                alt={product.title}
              />
              <h4 className="title">{product.title}</h4>
              <h5 className="price">
                {ethers.utils.formatEther(product.price)} ETH
              </h5>
              <h5 className="seller">Seller: {product.seller}</h5>
            </div>
          ))}
      {!isLoading && products.length === 0 && <div>No products found</div>}
    </div>
  )
}

export default ProductShowcase

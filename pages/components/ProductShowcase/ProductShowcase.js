import React, { useState } from 'react'
import { ethers } from 'ethers'
import {
  getMarketplaceContract,
  getProvider,
} from '../../contracts/Marketplace'

const ProductBox = ({ product }) => {
  const [buyQuantity, setBuyQuantity] = useState(1)

  function updateQuantity(quantity) {
    const finalQty = quantity > product.quantity ? product.quantity : quantity
    setBuyQuantity(Number(finalQty))
  }

  function handleBuyProduct() {
    if (product.quantity > 0 && buyQuantity > 0) {
      const finalPrice = ethers.utils.formatEther(product.price) * buyQuantity
      const finalWeiPrice = ethers.utils.parseEther(finalPrice.toString())
      const contract = getMarketplaceContract()
      const contractWithSigner = contract.connect(getProvider().getSigner())
      contractWithSigner.buyMarketItem(product.id, buyQuantity, {
        value: finalWeiPrice,
      })
      console.log(`Buying ${buyQuantity} of ${product.title} id: ${product.id}`)
    } else {
      alert(
        product.quantity === 0
          ? 'Sorry this product is out of stock'
          : 'Please enter a valid quantity',
      )
    }
  }

  const cantBuy = product.quantity === 0 || buyQuantity === 0

  return (
    <div key={product.title} className="product-card" style={{ width: '20%' }}>
      <img src={product.imageUrl} className="image" alt={product.title} />
      <h4 className="title">{product.title}</h4>
      <h5 className="seller">Seller: {product.seller}</h5>
      <h5 className="seller">In stock: {product.quantity} left</h5>
      <h5 className="price" align="right">
        {ethers.utils.formatEther(product.price)} ETH
      </h5>
      <div
        style={{
          fontSize: '20px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
        }}
      >
        {product.quantity > 0 && (
          <input
            type="number"
            value={buyQuantity}
            onChange={e => updateQuantity(e.target.value)}
            style={{ width: '50px', textAlign: 'center', height: '30px' }}
          />
        )}
        <button
          className={`buy-button ${cantBuy && 'buy-button-disabled'}`}
          onClick={handleBuyProduct}
        >
          Buy
        </button>
      </div>
    </div>
  )
}

const ProductShowcase = ({ products = [], isLoading = false }) => {
  return (
    <div className="product-container">
      {isLoading
        ? 'Loading...'
        : products?.map(product => (
            <ProductBox key={product.title} product={product} />
          ))}
      {!isLoading && products.length === 0 && <div>No products found</div>}
    </div>
  )
}

export default ProductShowcase

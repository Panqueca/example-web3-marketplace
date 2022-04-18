import { useState, useEffect } from 'react'
import Header from './components/Header'
import FilterContainer from './components/FilterContainer'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contracts/Marketplace'

export function convertABI(ABI) {
  const newABI = new ethers.utils.Interface(ABI)
  return newABI.format()
}

function getMarketplaceContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  return new ethers.Contract(
    CONTRACT_ADDRESS,
    convertABI(CONTRACT_ABI),
    provider,
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])

  async function start() {
    setIsLoading(true)
    const contract = getMarketplaceContract()
    const nextItemId = await contract.nextItemId()

    const newProducts = []

    for (let i = 0; i < nextItemId; i++) {
      const productInfo = await contract.getMarketItem(i)
      const productDetails = await contract.getMarketItemDetails(i)
      if (productInfo) newProducts.push({ ...productInfo, ...productDetails })
    }

    setIsLoading(false)
    setProducts(newProducts)
  }

  useEffect(() => {
    start()
  }, [])

  return (
    <div>
      <Header />
      <FilterContainer />
      <div className="product-container">
        {isLoading
          ? 'Loading...'
          : products.map(product => (
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
    </div>
  )
}

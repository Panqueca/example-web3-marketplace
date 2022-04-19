import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Header from './components/Header'
import FilterContainer from './components/FilterContainer'
import ProductShowcase from './components/ProductShowcase/ProductShowcase'
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

  async function fetchProducts() {
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
    fetchProducts()
  }, [])

  return (
    <div>
      <Header />
      <FilterContainer />
      <ProductShowcase products={products} isLoading={isLoading} />
    </div>
  )
}

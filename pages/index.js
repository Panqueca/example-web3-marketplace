import { useState, useEffect, useContext } from 'react'
import Header from './components/Header'
import FilterContainer from './components/FilterContainer'
import ProductShowcase from './components/ProductShowcase/ProductShowcase'
import { getMarketplaceContract } from './contracts/Marketplace'
import { UserContext } from './context/user'

export default function Home() {
  const user = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])

  async function fetchProducts() {
    if (user?.isConnected) {
      setIsLoading(true)
      const contract = getMarketplaceContract()
      const nextItemId = await contract.nextItemId()

      const newProducts = []

      for (let i = 0; i < nextItemId; i++) {
        const productInfo = await contract.getMarketItem(i)
        const productDetails = await contract.getMarketItemDetails(i)
        if (productInfo)
          newProducts.push({ id: i, ...productInfo, ...productDetails })
      }

      setIsLoading(false)
      setProducts(newProducts)
    }
  }

  useEffect(() => {
    if (user?.isConnected) fetchProducts()
  }, [user?.isConnected])

  return (
    <div>
      <Header />
      <FilterContainer />
      <ProductShowcase products={products} isLoading={isLoading} />
    </div>
  )
}

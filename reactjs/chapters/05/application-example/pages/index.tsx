import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react'
import SearchResults from '../components/SearchResults'

type SearchProductsApiData = {
  id: number
  price: number
  title: string
}

export type UiProductType = SearchProductsApiData & { priceFormatted: string }

export type Results = {
  data: UiProductType[]
  totalPrice: number
}

const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const Home: NextPage = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({
    data: [],
    totalPrice: 0,
  })

  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data: SearchProductsApiData[] = await response.json()

    const products = data.map(product => ({
      ...product,
      priceFormatted: priceFormatter.format(product.price)
    }))

    const totalPrice = data.reduce((total, product) => total + product.price, 0)

    setResults({ totalPrice, data: products })
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit">
          Submit
        </button>
      </form>

      <SearchResults results={results.data} totalPrice={results.totalPrice} onAddToWishlist={addToWishlist} />
    </div>
  )
}

export default Home

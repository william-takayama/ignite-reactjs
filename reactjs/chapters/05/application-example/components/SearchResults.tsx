import React from 'react'
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized'
import { Results } from '../pages'
import { ProductItem } from './ProductItem'

interface SearchResultsProps {
  results: Results['data']
  totalPrice: Results['totalPrice']
  onAddToWishlist: (id: number) => void
}

export default function SearchResults({ results, totalPrice, onAddToWishlist }: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => (
    <div key={key} style={style} >
      <ProductItem
        product={results[index]}
        onAddToWishlist={onAddToWishlist}
      /> 
    </div>
  )

  return (
    <div style={{ height: 300 }} >
      <h2>{totalPrice}</h2>

      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            rowHeight={30} // should have 15 elements
            overscanRowCount={5} // offset above and bellow
            rowCount={results.length}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  )
}

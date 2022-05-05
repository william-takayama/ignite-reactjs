import dynamic from 'next/dynamic'
import React, { memo, useState } from 'react'
import lodash from 'lodash'

import { UiProductType } from '../pages'
import { AddProductToWishlistProps } from './AddProductToWishlist'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => 
  import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist),
  {
    loading: () => <span>Loading . . .</span>
  }
)

interface ProductItemProps {
  product: UiProductType
  onAddToWishlist: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Add to wishlist</button>

      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
  // return Object.is(prevProps.product, nextProps.product)
})
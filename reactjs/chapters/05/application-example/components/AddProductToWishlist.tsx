import React from 'react'

export interface AddProductToWishlistProps {
  onAddToWishlist: () => void
  onRequestClose: () => void
}

export function AddProductToWishlist({ onAddToWishlist, onRequestClose }: AddProductToWishlistProps) {
  return (
    <span>
      Do you wish to add to favorites?
      <button onClick={onAddToWishlist}>Yes</button>
      <button onClick={onRequestClose}>No</button>
    </span>
  )
}

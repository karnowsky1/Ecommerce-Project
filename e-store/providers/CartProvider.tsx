"use client"

import { CartContextProvider } from "@/hooks/useCart"
import { Suspense } from "react"

interface CartProviderProps {
  children: React.ReactNode
}

const CartProvider: React.FC<CartProviderProps> = ({children}) => {
  return (
    <Suspense>
      <CartContextProvider>
        {children}
      </CartContextProvider>
    </Suspense>
  )
}

export default CartProvider
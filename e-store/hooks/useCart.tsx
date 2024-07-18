import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast"

type CartContextType = {
  cartTotalQuantity: number
  cartProducts: CartProductType[] | null
  handleAddProductToCart: (product: CartProductType) => void
  handleRemoveProductFromCart: (product: CartProductType) => void
  handleCartQuantityIncrease: (product: CartProductType) => void
  handleCartQuantityDecrease: (product: CartProductType) => void
  handleClearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
  [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(10)
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)

  useEffect(() =>{
    const cartItems: any = localStorage.getItem("eShopCartItems")
    const cProducts: CartProductType[] | null = JSON.parse(cartItems)

    setCartProducts(cProducts)
  }, [])

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart

      if(prev) {
        updatedCart = [...prev, product]
      } else {
        updatedCart = [product]
      }

      toast.success("Product added to Cart")
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart))

      return updatedCart
    })
  }, [])

  const handleRemoveProductFromCart = useCallback((
    product: CartProductType
  ) => {
    if(cartProducts) {
      const filteredProducts = cartProducts.filter
      ((item) => {
        return item.id !== product.id
      })

      setCartProducts(filteredProducts)
      toast.success("Product removed from cart")
      localStorage.setItem("eShopCartItems", JSON.stringify(filteredProducts))
    }
  }, [cartProducts])

  const handleCartQuantityIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart
      if(product.quantity === 99) {
        return toast.error("Oops! Maximum Quantity Reached!")
      }

      if(cartProducts) {
        updatedCart = [...cartProducts]

        const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity + 1
        }

        setCartProducts(updatedCart)
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart))
      }
    }, [cartProducts]
  )

  const handleCartQuantityDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart
      if(product.quantity === 1) {
        return toast.error("Oops! Minimum Quantity Reached! Click Remove to delete product.")
      }

      if(cartProducts) {
        updatedCart = [...cartProducts]

        const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity - 1
        }

        setCartProducts(updatedCart)
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart))
      }

    }, [cartProducts]
  )

  const handleClearCart = useCallback(
    () => {
      setCartProducts(null)
      setCartTotalQuantity(0)
      localStorage.setItem("eShopCartItems", JSON.stringify(null))
    }, [cartProducts]
  )


  const value = {
    cartTotalQuantity,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
    handleClearCart,
  }
  return <CartContext.Provider value={value} {...props}/>
}

export const useCart = () => {
  const context = useContext(CartContext);

  if(context === null) {
    throw new Error("useCart must be used within a CartContextProvider")
  }

  return context
}
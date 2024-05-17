import PropTypes from 'prop-types'
import React, { createContext, useContext, useState, useEffect } from 'react'
const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const [cartProducts, setCardProducts] = useState([])

  const updateLocalStorage = async products => {
    await localStorage.setItem('codeburger:cartInfo', JSON.stringify(products))
  }

  const putProductInCart = async product => {
    const cartIndex = cartProducts.findIndex(prd => prd.id === product.id)

    let newCartProducts = []
    if (cartIndex >= 0) {
      newCartProducts = cartProducts
      newCartProducts[cartIndex].quantity =
      newCartProducts[cartIndex].quantity + 1

      setCardProducts(newCartProducts)
    } else {
      product.quantity = 1
      newCartProducts = [...cartProducts, product]
      setCardProducts(newCartProducts)
    }

    await updateLocalStorage(newCartProducts)
  }

  const deleteProducts = async productId => {
    const newCart = cartProducts.filter(product => product.id !== productId)
    setCardProducts(newCart)
    await updateLocalStorage(newCart)
  }

  const increaseProducts = async ProductId => {
    const newCart = cartProducts.map(product => {
      return product.id === ProductId ? { ...product, quantity: product.quantity + 1 } : product
    })

    setCardProducts(newCart)
    await updateLocalStorage(newCart)
  }

  const decreaseProducts = async ProductId => {
    const cartIndex = cartProducts.findIndex(pd => pd.id === ProductId)

    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map(product => {
        return product.id === ProductId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      })
      setCardProducts(newCart)
      await updateLocalStorage(newCart)
    } else {
      deleteProducts(ProductId)
    }
  }

  useEffect(() => {
    const loadUserData = async () => {
      const clientCartData = await localStorage.getItem('codeburger:cartInfo')

      if (clientCartData) {
        setCardProducts(JSON.parse(clientCartData))
      }
    }
    loadUserData()
  }, [])

  return (
        <CartContext.Provider value={{ putProductInCart, cartProducts, increaseProducts, decreaseProducts }}>
            {children}
        </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used with UserContex')
  }
  return context
}

CartProvider.propTypes = {
  children: PropTypes.node
}

import PropTypes from 'prop-types'
import React from 'react'

import { useCart } from '../../hooks/CartContext'
import { Button } from '../index'
import {
  Container,
  Image,
  ProductName,
  ProductPrice
} from './style'
import { useNavigate } from 'react-router-dom'

export function CardProduct ({ product }) {
  const { putProductInCart } = useCart()
  const navigate = useNavigate()
  return (
    <Container>
        <Image src={product.url} alt='image do produto'/>
        <div>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.formatedPrice}</ProductPrice>

        <Button onClick={() => {
          putProductInCart(product)
        navigate('/carrinho')
        }
        }>Adicionar</Button>

        </div>
    </Container>
  )
}

CardProduct.propTypes = {
  product: PropTypes.object
}

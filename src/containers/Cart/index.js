import React from 'react'

import CartImage from '../../assets/CartImage.svg'
import { CartItems } from '../../components'
import {
  Container,
  CartImg
} from './style'

export function Cart () {
  return (
    <Container>
      <CartImg src={CartImage} alt='Logo do Cart'/>
      <CartItems/>
    </Container>
  )
}

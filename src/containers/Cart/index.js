import React from 'react'

import CartImage from '../../assets/CartImage.svg'
import { CartItems, CartResume, Header } from '../../components'
import {
  Container,
  CartImg,
  Wrapper
} from './style'

export function Cart () {
  return (
    <Container>
      <Header/>
      <CartImg src={CartImage} alt='Logo do Cart'/>
      <Wrapper>
      <CartItems/>
      <CartResume/>
      </Wrapper>
    </Container>
  )
}

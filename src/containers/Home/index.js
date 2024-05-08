import React from 'react'

import HeaderHome from '../../assets/headerHome.svg'
import { CategoryCarousel, OffersCarousel } from '../../components'
import {
  Container,
  HomeImg
} from './style'

export function Home () {
  return (
    <Container>
      <HomeImg src={HeaderHome} alt='Logo da home'/>
      <CategoryCarousel/>
      <OffersCarousel/>
    </Container>
  )
}

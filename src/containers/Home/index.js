import React from 'react'

import HeaderHome from '../../assets/headerHome.svg'
import CategoryCarousel from '../../components/CategoryCarousel'
import OffersCarousel from '../../components/OffersCarousel'
import {
  Container,
  HomeImg
} from './style'

function Home () {
  return (
    <Container>
      <HomeImg src={HeaderHome} alt='Logo da home'/>
      <CategoryCarousel/>
      <OffersCarousel/>
    </Container>
  )
}

export default Home

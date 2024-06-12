import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderHome from '../../assets/headerHome.svg';
import { Header, CategoryCarousel, OffersCarousel } from '../../components';
import {
  Container,
  HomeImg
} from './style';

export function Home () {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('codeburger:userData');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Container>
      <Header />
      <HomeImg src={HeaderHome} alt='Logo da home'/>
      <CategoryCarousel />
      <OffersCarousel />
    </Container>
  );
}

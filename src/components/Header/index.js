import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cart from '../../assets/iconCart.svg';
import { useUser } from '../../hooks/UserContext';
import Person from '../../assets/iconUser.svg';
import {
  Container,
  ContainerLeft,
  PageLink,
  ContainerRight,
  ContainerText,
  Line,
  PageLinkExit
} from './style';

export function Header() {
  const { logout, userData } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logoutUser = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    const currentPath = location.pathname;
    return currentPath.startsWith(path);
  };

  return (
    <Container>
      <ContainerLeft>
        <PageLink onClick={() => navigate('/')} isactive={(pathname === '/').toString()}>Home</PageLink>
        <PageLink onClick={() => navigate('/produtos')} isactive={isActive('/produtos').toString()}>Ver Produtos</PageLink>
      </ContainerLeft>

      <ContainerRight>
        <PageLink onClick={() => navigate('/carrinho')} isactive={(pathname === '/carrinho').toString()}>
          <img src={Cart} alt='carrinho' />
        </PageLink>

        <Line />

        <PageLink>
          <img src={Person} alt='icone de usuario' />
        </PageLink>

        <ContainerText>
          <p>Olá, {userData.name}</p>
          <PageLinkExit onClick={logoutUser}>Sair</PageLinkExit>
        </ContainerText>
      </ContainerRight>
    </Container>
  );
}

export default Header;

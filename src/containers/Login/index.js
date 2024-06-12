import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import LonginImg from '../../assets/imgDeLogin.svg';
import Logo from '../../assets/Logo.svg';
import { Button, ErrorMessage } from '../../components';
import { useUser } from '../../hooks/UserContext';
import api from '../../services/api';

import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  SignInLink,
} from './styles';

export function Login() {
  const navigate = useNavigate();
  const { putUserData, userData } = useUser();

  const schema = Yup.object().shape({
    email: Yup.string().email('Digite um e-mail válido').required('O email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 dígitos'),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (clientData) => {
    try {
      const { data } = await toast.promise(
        api.post('sessions', {
          email: clientData.email,
          password: clientData.password,
        }),
        {
          pending: 'Verificando seus dados',
          success: 'Seja bem-vindo(a)',
          error: 'Verifique seu e-mail e senha🤯',
        }
      );
      putUserData(data); // Colocando os dados do usuário no contexto
      console.log('User Data after login:', data); // Log dos dados do usuário

      setTimeout(() => {
        if (data.admin) {
          navigate('/pedidos');
        } else {
          navigate('/');
        }
      }, 1000);
    } catch (error) {
      console.error('Erro ao processar login:', error);
    }
  };

  useEffect(() => {
    console.log(userData); // Exibindo os dados do usuário
  }, [userData]);

  return (
    <Container>
      <LoginImage src={LonginImg} alt="login-image" />
      <ContainerItens>
        <img src={Logo} alt='Logo-code-Burger' />
        <h1>Login</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <Input type='email' {...register('email')} error={errors.email?.message} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input type='password' {...register('password')} error={errors.password?.message} />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type='submit' style={{ marginTop: 75, marginBottom: 25 }}>Sign In</Button>
        </form>
        <SignInLink>
          Não possui conta? <Link style={{ color: 'white' }} to="/cadastro">Sign Up</Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  );
}

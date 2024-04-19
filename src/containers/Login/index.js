import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import LonginImg from '../../assets/imgDeLogin.svg'
import Logo from '../../assets/Logo.svg'
import Button from '../../components/Button'
import api from '../../services/api'
import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  ErrorMessage
} from './styles'

function Login () {
  const schema = Yup.object().shape({
    email: Yup.string().email('Digite um e-mail valido').required('O email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 digitos')
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onsubmit = async clientData => {
    const response = await api.post('sessions', {
      email: clientData.email,
      password: clientData.password
    })

    console.log(response)
  }

  return (

    <Container>
    <LoginImage src={LonginImg} alt="login-image" />
    <ContainerItens>
      <img src={Logo} alt='Logo-code-Burger' />
      <h1>Login</h1>

      <form noValidate onSubmit={handleSubmit(onsubmit)}>
      <Label>Email</Label>
      <Input type='email' {...register('email')} error={errors.email?.message}/>
      <ErrorMessage>{errors.email?.message}</ErrorMessage>

      <Label>Senha</Label>
      <Input type='password' {...register('password')}error={errors.password?.message}/>
      <ErrorMessage>{errors.password?.message}</ErrorMessage>

      <Button type='submit' style ={{ marginTop: 75, marginBottom: 25 }}>Sign In</Button>
      </form>
      <SignInLink>
        Não possui conta ? <a>Sign Up</a>
        </SignInLink>
    </ContainerItens>
  </Container>

  )
} export default Login

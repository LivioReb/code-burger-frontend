import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import LonginImg from '../../assets/imgDeLogin.svg'
import Logo from '../../assets/Logo.svg'
import Button from '../../components/Button'
import { useUser } from '../../hooks/UserContext'
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
  const { putUserData, userData } = useUser()

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
    try {
      const { data } = await api.post('sessions', {
        email: clientData.email,
        password: clientData.password
      })
      putUserData(data) // Colocando os dados do usuário no contexto
    } catch (error) {
      console.error('Erro ao processar login:', error)
    }
  }

  useEffect(() => {
    console.log(userData) // Exibindo os dados do usuário
  }, [userData])

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
          Não possui conta ? <Link style={{ color: 'white' }} to="/cadastro">Sign Up</Link>
          </SignInLink>
      </ContainerItens>
    </Container>

  )
} export default Login

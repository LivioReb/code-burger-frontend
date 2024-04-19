import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import RegisterImg from '../../assets/imgDeCadastro.svg'
import Logo from '../../assets/Logo.svg'
import Button from '../../components/Button'
import api from '../../services/api'
import {
  Container,
  RegisterImage,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  ErrorMessage
} from './styles'

function Register () {
  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o seu nome'),
    email: Yup.string()
      .email('Digite um e-mail valido')
      .required('O email é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 digitos'),
    confirmPassword: Yup.string()
      .required('Confirme a sua senha')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onsubmit = async clientData => {
    const response = await api.post('users', {
      name: clientData.name,
      email: clientData.email,
      password: clientData.password
    })

    console.log(response)
  }

  return (

    <Container>
      <RegisterImage src={RegisterImg} alt="register-image" />
      <ContainerItens>
        <img src={Logo} alt='Logo-code-Burger' />
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onsubmit)}>
        <Label error={errors.name?.message} >Nome</Label>
        <Input type='text' {...register('name')} error={errors.name?.message}/>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

        <Label error={errors.email?.message}>E-mail</Label>
        <Input type='email' {...register('email')} error={errors.email?.message}/>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>

        <Label error={errors.password?.message}>Senha</Label>
        <Input type='password' {...register('password')}error={errors.password?.message}/>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>

        <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
        <Input
         type='password'
         {...register('confirmPassword')}
         error={errors.confirmPassword?.message}
         />
        <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

        <Button type='submit' style ={{ marginTop: 25, marginBottom: 25 }}>Sign Up</Button>
        </form>
        <SignInLink>
          Já possui conta ? <a>Sign in</a>
          </SignInLink>
      </ContainerItens>
    </Container>

  )
} export default Register

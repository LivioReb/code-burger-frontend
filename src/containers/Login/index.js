import React from 'react'

import LoginImg from '../../assets/imgDeLogin.png'
import Logo from '../../assets/Logo.png'
import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  Button,
  SignInLink
} from './styles'

function Login () {
  return (<div>
        <Container>
          <LoginImage src={LoginImg} alt="login-image"/>
          <ContainerItens>
            <img src={Logo} alt='logo-code-burguer'/>
            <h1>Login</h1>

            <Label>Email</Label>
            <Input/>

            <Label>Senha</Label>
            <Input/>
            <Button>Entrar</Button>
            <SignInLink>Não possui conta ? <a>SignUp</a></SignInLink>
          </ContainerItens>
        </Container>
    </div>
  )
} export default Login

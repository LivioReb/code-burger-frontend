import styled from 'styled-components'

export const Container = styled.div`
    width: 100vw;
    height:100vh;
    display: flex;
    background: #3C3C3C;
    justify-content: center;
    align-items: center;
    `

export const LoginImage = styled.img`
height: 100%;
`

export const ContainerItens = styled.div`
background: #373737;
border-radius: 0 10px 10px 0;
height: 100%;
padding: 25px 75px;
display: flex;
flex-direction: column;
justify-content: center;

h1{
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #ffffff;
  text-align: center;
  margin-top: 100px;
}
img{
  width: 260px;  
  height: 94px;
  display: flex;
  justify-content: center;
  align-items: center;
}
`

export const Label = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height:14px;
  color: #ffffff;
  margin-top: 28px;
  margin-bottom: 5px;
`

export const Input = styled.input`
width: 300px;
height: 50px;
background: #ffffff;
box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
border-radius: 5px;
border: none;
padding-left: 10px;
`

export const Button = styled.button`
  width: 182px;
  height: 37px;
  background: #9758a6;
  border-radius: 20px;
  border: none;
  cursor:pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
 margin-top: 75px;
 margin-bottom: 25px;
  
  &:hover{
    opacity: 0.8;
  }

  &:active{
    opacity: 0.6;
  }
`

export const SignInLink = styled.p`
font-style: normal;
font-weight: 300;
font-size: 14px;
line-height: 16px;
color: #ffffff;

a{
  cursor: pointer;
  text-decoration: underline;
}`

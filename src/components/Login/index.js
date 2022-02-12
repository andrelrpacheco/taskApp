import React, { useState } from 'react'
import firebase from '../../services/firebaseConnection'
import {
	Container,
	InputText,
	ButtonLogin,
	ButtonCreateLogin,
	TextLogin,
	TextCreateLogin,
	TextLoginOrCreateAccount
} from './styles'

export default function Login({ changeStatus }) {
  const [type, setType] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    try {
      if(type === 'login') {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
        changeStatus(response.user.uid)
        alert('Login efetuado com sucesso')
      } else {
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
        changeStatus(response.user.uid)
        alert('Usuário criado com sucesso')
      }
    } catch (error) {
      console.log(error)
      alert('Ops! Ocorreu um erro. Tente novamente!')
    }
  }

	function loginOrCreateAccount() {
		setType(type => type === 'login' ? 'cadastrar' : 'login')
	}

  return (
    <Container>
      <InputText
        placeholder='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <InputText
        placeholder='********'
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <ButtonLogin onPress={handleLogin}>
        <TextLogin>
          {type === 'login' ? 'Acessar' : 'Cadastrar'}
        </TextLogin>
      </ButtonLogin>

      <ButtonCreateLogin onPress={loginOrCreateAccount}>
        <TextLoginOrCreateAccount>
					{type === 'login' ? 'Ainda não tem conta?' : 'Já possui uma conta?'}
				</TextLoginOrCreateAccount>
      	<TextCreateLogin>
        	{type === 'login' ? 'Criar conta' : 'Entrar'}
      	</TextCreateLogin>
      </ButtonCreateLogin>
    </Container>
  )
}

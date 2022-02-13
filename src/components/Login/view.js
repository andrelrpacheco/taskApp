import React from 'react'
import {
	Container,
	InputText,
	ButtonLogin,
	ButtonCreateLogin,
	TextLogin,
	TextCreateLogin,
	TextLoginOrCreateAccount
} from './styles'

export default function LoginScreen(props) {
	const {
		loginOrCreateAccount,
		handleLogin,
		email,
		password,
		type,
		setEmail,
		setPassword
	} = props

  return (
    <Container>
      <InputText
        placeholder='Email'
        value={email}
				keyboardType='email-address'
        onChangeText={(text) => setEmail(text)}
      />

      <InputText
        placeholder='********'
				secureTextEntry
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

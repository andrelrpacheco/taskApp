import React, { useState, createElement } from 'react'
import firebase from '../../services/firebaseConnection'
import LoginScreen from './view'

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

	const viewProps = {
		loginOrCreateAccount,
		handleLogin,
		type,
		setType,
		setEmail,
		setPassword
	}

	return createElement(LoginScreen, viewProps)
}

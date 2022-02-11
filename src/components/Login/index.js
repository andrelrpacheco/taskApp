import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import firebase from '../../services/firebaseConnection'

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

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                style={styles.input}
                placeholder='********'
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity
                style={styles.btnLogin}
                onPress={handleLogin}
            >
                <Text style={styles.textLogin}>
                    {type === 'login' ? 'Acessar' : 'Cadastrar'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btnCreateLogin}
                onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')}
            >
                <Text style={styles.text}>{type === 'login' ? 'Ainda não tem conta?' : 'Já possui uma conta?'}</Text>
                <Text style={styles.textCreateLogin}>
                    {type === 'login' ? 'Criar conta' : 'Entrar'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#edf2f4'
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#aab',
        borderRadius: 6,
        height: 50,
        padding: 10,
        fontSize: 16,
        color: '#000000'
    },
    btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 6,
        marginBottom: 20,
        backgroundColor: '#0080fe'
    },
    textLogin: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    btnCreateLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textCreateLogin: {
        color: '#0565ff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginLeft: 5
    },
    text: {
        fontSize: 15
    }
})

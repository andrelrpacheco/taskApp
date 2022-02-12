import styled from 'styled-components'

export const Container = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
	padding-horizontal: 10px;
	background-color: #edf2f4;
`

export const InputText = styled.TextInput`
	margin-bottom: 10px;
	background-color: #ffffff;
	border-width: 1px;
	border-color: #aab;
	border-radius: 6px;
	height: 50px;
	padding: 10px;
	font-size: 16px;
	color: #000000;
`

export const ButtonLogin = styled.TouchableOpacity`
	align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 6px;
  margin-bottom: 20px;
  background-color: #0080fe;
`

export const ButtonCreateLogin = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: center;
`

export const TextLogin = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: #ffffff;
`

export const TextCreateLogin = styled.Text`
	color: #0565ff;
	font-size: 16px;
	font-weight: bold;
	text-transform: uppercase;
	margin-left: 5px;
`

export const TextLoginOrCreateAccount = styled.Text`
	font-size: 15px;
`

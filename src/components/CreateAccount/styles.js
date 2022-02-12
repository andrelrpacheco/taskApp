import styled from 'styled-components'

export const Container = styled.SafeAreaView``

export const ContainerTask = styled.View`
	flex-direction: row;
`

export const InputText = styled.TextInput`
	flex: 1;
	margin-bottom: 25px;
	padding: 10px;
	background-color: #ffffff;
	border-radius: 6px;
	height: 50px;
	color: #000000;
	font-size: 16px;
`

export const ButtonAddTask = styled.TouchableOpacity`
	background-color: #0a9396;
	height: 50px;
	align-items: center;
	justify-content: center;
	margin-left: 5px;
	padding-horizontal: 15px;
	border-radius: 6px;
`
export const CancelContentEdit = styled.View`
	flex-direction: row;
	margin-bottom: 15px;
`
export const ButtonCancelEditing = styled.TouchableOpacity``

export const TextCancelEditing = styled.Text`
	margin-left: 5px;
	color: #ff0000;
`

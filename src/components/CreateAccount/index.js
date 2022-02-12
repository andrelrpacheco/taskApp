import React, { useState, useEffect, useRef } from 'react'
import { FlatList, Keyboard } from 'react-native'
import Login from '../Login/'
import TaskList from '../TaskList'
import firebase from '../../services/firebaseConnection'
import IconFeather from 'react-native-vector-icons/Feather'
import {
	Container,
	ContainerTask,
	InputText,
	ButtonAddTask,
	CancelContentEdit,
	ButtonCancelEditing,
	TextCancelEditing
} from './styles'

export default function CreateAccount() {
    const [user, setUser] = useState(null)
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [key, setKey] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {

        async function getUser() {
            try {
                if(!user) {
                    return
                }

                await firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
                    setTasks([])

                    snapshot?.forEach((childItem) => {
                        let data = {
                            key: childItem.key,
                            nome: childItem.val().nome
                        }

                        setTasks(oldTasks => [...oldTasks, data])
                    })
                })
            } catch (error) {
                alert('Ops! Não foi possível listar as tarefas.')
            }
        }

        getUser()

    }, [user])

    if(!user) {
        return <Login changeStatus={(user) => setUser(user)} />
    }

    async function handleAddTask() {
        if(newTask === '') {
            return
        }

        try {
            if(key !== '') {
                await firebase.database().ref('tarefas').child(user).child(key).update({
                    nome: newTask
                })
                const taskIndex = tasks.findIndex((item) => item.key === key)
                let taskClone = tasks
                taskClone[taskIndex].nome = newTask

                setNewTask([...taskClone])

                Keyboard.dismiss()
                setNewTask('')
                setKey('')
                return
            }

            const myTasks = firebase.database().ref('tarefas').child(user)
            const keyTask = myTasks.push().key

            await myTasks.child(keyTask).set({
                nome: newTask
            })

            const data = {
                key: keyTask,
                nome: newTask
            }

            setTasks(oldTasks => [...oldTasks, data])
            setNewTask('')

        } catch (error) {
            alert('Ops! Ocorreu um erro. Tente novamente!')
        }
    }

    async function handleDelete(key) {
        try {
            await firebase.database().ref('tarefas').child(user).child(key).remove()
            const findTasks = tasks.filter(item => item.key !== key)
            alert('Tarefa removida com sucesso!')
            setTasks(findTasks)
        } catch (error) {
            alert('Ops! Ocorreu um erro, tente novamente!')
        }
    }

    function handleEdit(item) {
       setKey(item.key)
       setNewTask(item.nome)
       inputRef.current.focus()
    }

    function cancelEdit() {
        setNewTask('')
        setKey('')
        Keyboard.dismiss()
    }

    return (
        <Container>
            {key.length > 0 && (
                <CancelContentEdit>
                    <ButtonCancelEditing onPress={cancelEdit}>
                        <IconFeather name='x-circle' color='#ff0000' size={22} />
                    </ButtonCancelEditing>
                    <TextCancelEditing>
                        Você está editando uma tarefa!
                    </TextCancelEditing>
                </CancelContentEdit>
            )}

            <ContainerTask>
                <InputText
                    placeholder='Crie uma nova tarefa'
                    value={newTask}
                    onChangeText={(item) => setNewTask(item)}
                    ref={inputRef}
                />

                <ButtonAddTask onPress={handleAddTask}>
                    <IconFeather name='plus' color='#FFFFFF' size={22} />
                </ButtonAddTask>
            </ContainerTask>

            <FlatList
                data={tasks}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <TaskList
                        data={item}
                        deleteItem={handleDelete}
                        editItem={handleEdit}
                    />
                )}
            />

        </Container>
    )
}

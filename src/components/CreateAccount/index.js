import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Keyboard
} from 'react-native'
import Login from '../Login'
import TaskList from '../TaskList'
import firebase from '../../services/firebaseConnection'
import IconFeather from 'react-native-vector-icons/Feather'

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
        <SafeAreaView style={styles.container}>
            {key.length > 0 && (
                <View style={{ flexDirection: 'row', marginBottom: 15 }} >
                    <TouchableOpacity onPress={cancelEdit}>
                        <IconFeather name='x-circle' color='#ff0000' size={22} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 5, color: '#ff0000' }}>
                        Você está editando uma tarefa!
                    </Text>
                </View>
            )}

            <View style={styles.containerTask}>
                <TextInput
                    style={styles.inputText}
                    placeholder='Crie uma nova tarefa'
                    value={newTask}
                    onChangeText={(item) => setNewTask(item)}
                    ref={inputRef}
                />

                <TouchableOpacity style={styles.buttonAdd} onPress={handleAddTask}>
                    <Text style={styles.textAdd}>+</Text>
                </TouchableOpacity>
            </View>

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

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerTask: {
        flexDirection: 'row',
    },
    inputText: {
        flex: 1,
        marginBottom: 25,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        height: 60,
        color: '#000000',
        fontSize: 16
    },
    buttonAdd: {
        backgroundColor: '#0a9396',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        paddingHorizontal: 15,
        borderRadius: 6
    },
    textAdd: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold'
    }
})

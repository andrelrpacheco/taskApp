import React from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import IconsFeather from 'react-native-vector-icons/Feather'

export default function TaskList({ data, deleteItem, editItem }) {
    return (
        <View style={styles.containerList}>
            <View style={styles.contentList}>
                <Text style={styles.textList}>{data.nome}</Text>
            </View>

            <View style={styles.buttonsIcons}>
                <View style={{ marginLeft: 10 }}>
                    <TouchableWithoutFeedback
                        style={styles.buttonIconEdit}
                        onPress={() => editItem(data)}
                    >
                        <IconsFeather name='edit' color='#0a9396' size={26} />
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.buttonIconDelete}
                        onPress={() => deleteItem(data.key)}
                    >
                        <IconsFeather name='trash-2' color='#ff0000' size={26} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerList: {
        width: '100%',
        height: 55,
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        borderRadius: 5
    },
    buttonsIcons: {
        flexDirection: 'row',
    },
    contentList: {
        paddingRight: 10
    },
    buttonIconDelete: {
        marginLeft: 10
    },
    textList: {
        color: '#000000',
        fontSize: 17,
        paddingRight: 15
    }
})

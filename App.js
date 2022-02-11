import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import CreateAccount from './src/components/CreateAccount'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CreateAccount />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5'
  }
})

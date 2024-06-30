import React from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'

const LoginForm = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.loginForm}>Login Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
      />
      <TextInput
        style={[styles.input, styles.input2]}
        placeholder="Password"
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={() => {}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '50%',
    height: 470,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#747d8c38',
    backgroundColor: 'rgba(217, 217, 217, 0.203)',
    paddingLeft: 19,
    color: '#313439dd',
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input2: {
    marginBottom: 25
  },
  loginForm: {
    fontSize: 20,
    color: '#302D2D',
    marginBottom: 30
  }
})

export default LoginForm
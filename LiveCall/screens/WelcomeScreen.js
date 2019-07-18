import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

export default class WelcomeScreen extends Component {
  static navigationOptions={
    header:null
  }

  onLogin(){
    this.props.navigation.push("Login");
  }

  onSignin(){
    this.props.navigation.push("Signin");
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title={'LogIn'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
        <Button
          title={'SignIn'}
          style={styles.input}
          onPress={this.onSignin.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

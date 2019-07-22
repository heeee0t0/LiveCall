import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
<<<<<<< HEAD
import * as firebase from "firebase";
import firebaseauth from '../firebase/firebaseauth'
=======


>>>>>>> 645dfafa4e1de5c88b74680ed1c0f9a0dccb79c5
export default class SignIn extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    state = {
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
    }
    this.SignUp = this.SignUp.bind(this)
  }

  SignUp = () => {
    const self=this;
    var ref = firebase.database().ref("webRTCusers");
    var email = (ref.orderByChild("email").equalTo(this.state.email))
    email.once("value", function (snapshotEmail) {
      if (snapshotEmail.val() == null) {
        if (self.state.password == self.state.confirmpassword) {
          var key = firebase.database().ref('webRTCusers').push();
          key.set({
            username: self.state.username,
            password: self.state.password,
            email: self.state.email
          })
          Alert.alert("Successfully Registered ")
          self.props.navigation.push("Login");
        }
        else {
          Alert.alert("Passwords Are Not Matching!Please re-enter ")
          self.textPassword.clear();
          self.textConfirmPassword.clear();
          self.textPassword.focus();
        }
      }
      else {
        Alert.alert("Email address is already taken!!!");

      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/person/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="User Name"
            underlineColorAndroid='transparent'
            onChangeText={(username) => this.setState({ username })}
            ref={input => { this.textUsername = input }} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({ email })}
            ref={input => { this.textEmail = input }} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ password })}
            ref={input => { this.textPassword = input }} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Confirm Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(confirmpassword) => this.setState({ confirmpassword })}
            ref={input => { this.textConfirmPassword = input }} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.SignUp} >
          <Text style={styles.loginText}>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.registerButton]} onPress={() => this.props.navigation.push("Login")}>
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  registerButton: {
    backgroundColor: "white",
  },
  loginText: {
    color: 'white',
  }
});
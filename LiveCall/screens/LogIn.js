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
import firebaseauth from "../firebase/firebaseauth";
=======


>>>>>>> 645dfafa4e1de5c88b74680ed1c0f9a0dccb79c5
export default class LoginIn extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedInuser: '',
      flag: false,
      email1: '',
      password1: ''
    }
    this.Login = this.Login.bind(this)
    this.ValidationEmail = this.ValidationEmail.bind(this)
    this.ValidationPassword = this.ValidationPassword.bind(this)
  }


  Login = () => {
    const self = this
    var ref = firebase.database().ref("webRTCusers");
    var email = (ref.orderByChild("email").equalTo(this.state.email))
    var password = (ref.orderByChild("password")).equalTo(this.state.password)
    email.on("value", function (snapshotEmail) {
      if (snapshotEmail.val() == null) {
        self.ValidationEmail()
      }
      else {
        snapshotEmail.forEach(function (childEmail) {
          password.on("value", function (snapshotPassword) {
            if (snapshotPassword.val() == null) {
              self.ValidationPassword()
            }
            else {
              snapshotPassword.forEach(function (childPassword) {
                if ((childEmail.val().email == self.state.email) && (childPassword.val().password == self.state.password)) {
                  const username=childEmail.val().username;
                  const email=childEmail.val().email;
                  self.props.navigation.push("Home",{userdata:{name:username,email:email}});
                }
              })
            }
          })
        });
      }
    });
  }
  ValidationEmail = () => {
    Alert.alert("Login Failed,Invalid E-mail!!! Please re-enter");
    this.textEmail.clear();
    this.textPassword.clear();
    this.textEmail.focus()
  }
  ValidationPassword = () => {
    Alert.alert("Login Failed,Invalid Password!!! Please re-enter ");
    this.textPassword.clear();
    this.textPassword.focus();
  }
  render() {
    return (
      <View style={styles.container}>
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

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.Login}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.registerButton]} onPress={() => this.props.navigation.push("Signin")}>
          <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
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
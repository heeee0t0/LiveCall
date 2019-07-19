import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableHighlight, Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Videocall extends Component {

    onCallHangUp=()=>{
        this.props.navigation.goBack();
    }
    
    render() {
        return (
            <View style={styles.root}>
                <View style={styles.localVideo} />
                <View style={styles.remoteVideo} />
                <View style={styles.buttonContainer}>
                    <TouchableHighlight style={[styles.button, styles.buttonCall]} onPress={() => this.onCallHangUp()}>
                        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/call/win8/100/ffffff'}}/>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const remoteVideoWidth=Math.round(screenWidth-122);

const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: "rgb(255,255,255)"
    },
    localVideo: {
      top: 0,
      left: 0,
      width: screenWidth,
      height: screenHeight,
      backgroundColor: "rgba(0,0,0,1)",
      position: "absolute"
    },
    remoteVideo: {
      top: 0,
      left: remoteVideoWidth,
      width: 122,
      height: 172,
      backgroundColor: "rgba(230, 230, 230,1)",
      position: "absolute"
    },
    buttonContainer:{
      top: screenHeight-170,
      left: screenWidth/2.4,
      flexDirection:'row',
      marginTop:20,
    },
    button: {
        width:60,
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        borderRadius:30,
        margin:10,
        shadowColor: 'black',
        shadowOpacity: .8,
        shadowOffset: {
          height:2,
          width:-2
        },
        elevation:4,
    },
    buttonCall: {
      backgroundColor: "red",
    },
    icon: {
      width:35,
      height:35,
    }
  });
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert
} from 'react-native';

const { width } = Dimensions.get('window');

export default class Call extends Component {
  static navigationOptions={
    header:null
  }

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      User:{
        id:1,
        name:"Mark Johnson",
        image:"https://bootdey.com/img/Content/avatar/avatar6.png",
      }
    };
  }

  handleReceiveCall=()=>{
    
    this.props.navigation.navigate("Videocall",{user:{},socket:{}});
  }

  clickEventListener = () =>{
    Alert.alert('Message', 'button clicked');
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={[styles.iconImg, { marginRight: 50 }]} source={{uri: "https://img.icons8.com/color/48/000000/video-call.png"}}/>
            <Text style={styles.subText}>LIVE CALL</Text>
          </View>
          <Text style={styles.title}>{this.state.User.name}</Text>
          <Text style={styles.subText}>CALLING</Text>
        </View>
        {/* <TouchableOpacity style={[styles.btnStopCall, styles.shadow]} onPress={()=> this.clickEventListener()}>
          <Image style={styles.iconImg} source={{uri: "https://img.icons8.com/windows/32/000000/phone.png"}}/>
        </TouchableOpacity> */}
        <Image style={[styles.image]} source={{ uri: this.state.User.image }}/>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.btnStopCall, styles.shadow]} onPress={()=> this.clickEventListener()}>
            <Image style={styles.iconImg} source={{uri: "https://img.icons8.com/windows/32/000000/phone.png"}}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, styles.shadow]} onPress={()=> this.handleReceiveCall()}>
            <Image style={styles.iconImg} source={{uri: "https://img.icons8.com/windows/32/000000/phone.png"}}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnStopCall, styles.shadow]} onPress={()=> this.clickEventListener()}>
            <Image style={styles.iconImg} source={{uri: "https://img.icons8.com/material-outlined/48/000000/topic.png"}}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#00BFFF',
    height: 140,
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e20e30',
    marginTop: 250 
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    flex: 1,
  },
  title: {
    color: '#f0efef',
    fontSize: 36,
  },
  subText: {
    color: '#c8c8c8',
    fontSize: 14,
  },
  iconImg:{
    height: 32,
    width: 32, 
    alignSelf:'center'
  },
  btnStopCall: {
    height:45,
    width:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:22,
    backgroundColor: "#FF0000",
    zIndex:1,
  },
  btnAction: {
    height:45,
    width:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:22,
    backgroundColor: "#008000",
  },
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  }
}); 
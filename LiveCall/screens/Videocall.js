import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableHighlight, Dimensions } from "react-native";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices
} from 'react-native-webrtc';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


class Videocall extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('username',""),
    };
  };

  constructor(){
    super();
    this.handleJoin=this.handleJoin.bind(this)
    this.setupWebRTC=this.setupWebRTC.bind(this)
    this.onConnectionStateChange=this.onConnectionStateChange.bind(this)
    this.onAddStream=this.onAddStream.bind(this)
    this.onIceCandidate=this.onIceCandidate.bind(this)
    this.handleOffer=this.handleOffer.bind(this)
    this.onReceiveOffer=this.onReceiveOffer.bind(this)
    this.onReceiveAnswer=this.onReceiveAnswer.bind(this)
    this.state={
      user:{},
      socket:{},
      caller:false,
      localStreamURL:null,
      remoteStreamURL:null,
      iceConnectionState:'',
      iceCandidates:[],
      isAnswerReceived:false,
      isOfferReceived:false,
      offer:{},
      answer:{},
      localVideo:{},
      remoteVideo:{},
      localVideoStream:{},
      desc:""
    }
  }

  async setupWebRTC() {
    const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
    const pc = new RTCPeerConnection(configuration);
    pc.onconnectionstatechange=this.onConnectionStateChange
    pc.onaddstream=this.onAddStream
    pc.onicecandidate=this.onIceCandidate

    
    pc.addStream(this.state.localVideoStream)
    console.log("localstream",this.state.localVideoStream);
    this.pc = pc;
  }

  async handleJoin(e) {
    await this.setupWebRTC();
    const { pc } = this;

    try {
      // Create Offer
      pc.createOffer({offerToReceiveVideo:true,
        offerToReceiveAudio:true}).then(desc => {
        pc.setLocalDescription(desc).then(() => {
          console.log("Sdp",desc);
          this.setState({desc});
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  onConnectionStateChange(e) {
    console.log("onConnectionStateChange",e);
    this.setState({
      iceConnectionState: e.target.iceConnectionState
    })
  }

  onAddStream(e) {
    console.log("onAddStream",e.stream.toURL());
    console.log("onAddStream full",e.stream);
    this.setState({
      remoteVideo:e.stream,
      remoteStreamURL: e.stream.toURL()
    })
    this.remoteStream = e.stream
  }

  onIceCandidate(e) {
    const { candidate } = e;
    if (candidate) {
      const { iceCandidates } = this.state;
      if (Array.isArray(iceCandidates)) {
        this.setState({
          iceCandidates: [...iceCandidates, candidate]
        })
      } else {
        this.setState({
          iceCandidates: [candidate]
        })
      }
    } else {
      if (this.state.iceCandidates.length > 1) {
        //send this to signaling server
        let offerOrAnswer = {
          type: this.state.isOfferReceived ? 'answer' : 'offer',
          payload: {
            description: this.pc.localDescription,
            iceCandidates: this.state.iceCandidates
          }
        }
        console.log("offerOrAnswer", offerOrAnswer);
        // send offer to signaling server
        if (offerOrAnswer.type == "offer") {
          console.log("offerOrAnswer", offerOrAnswer.type);
          setTimeout(() => {
            this.state.socket.emit('offer', JSON.stringify(offerOrAnswer));
          }, 5000);
          console.log("emit called");
        } else {
          this.state.socket.emit('answer', JSON.stringify(offerOrAnswer));
        }
      } else {
        console.error("No candidates found");
      }
    }
  }

  onReceiveOffer(offer) {
    this.setState({
      offer:JSON.parse(offer),
      isOfferReceived: true
    }, () => {
      console.log("offer received", offer)
      this.handleOffer();
    })
  }

  handleOffer() {
    const { payload } = this.state.offer;
    this.setupWebRTC();
    
    const { pc } = this;
    var offerSdp = { "sdp": payload.description.sdp, "type": "offer" };
    console.log("offerSdp",offerSdp);
    
    pc.setRemoteDescription(new RTCSessionDescription(offerSdp))
    

    if (Array.isArray(payload.candidates)) {
      payload.candidates.forEach((c) => peer.addIceCandidate(new RTCIceCandidate(c)))
    }
    try {
      // Create Offer
      pc.createAnswer().then(answer => {
        pc.setLocalDescription(answer).then(() => {
          // Send pc.localDescription to peer
            console.log("answer generated",answer);
          this.setState({answer});
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  onReceiveAnswer(answer) {
    const { payload } = JSON.parse(answer);
    console.log(" onReceiveAnswer payload",payload)
    var answerSdp = { "sdp": payload.description.sdp, "type": "answer" };
    //set answersdp to current peer RemoteDescription.
    this.pc.setRemoteDescription(new RTCSessionDescription(answerSdp))
    payload.iceCandidates.forEach(c => this.pc.addIceCandidate(new RTCIceCandidate(c)))
    this.setState({
      answer:JSON.parse(answer),
      isAnswerReceived: true
    }, () => {
      console.log("answerReceived")
    })
  }

  componentDidMount(){
    const self = this; 
    const { navigation } = this.props;
    const user = navigation.getParam('user', {});
    const caller = navigation.getParam('caller', false);
    const socket = navigation.getParam('socket', {});
    this.setState({
      user,
      socket
    });

    socket.on('offer', function (offer) {
      console.log("Offeronsocket",offer)
      self.onReceiveOffer(offer);
    });

    socket.on('answer', function(answer){
      console.log("answeronsocket called",answer)
      self.onReceiveAnswer(answer);
    });

    // WebRTC getUserMedia setup
    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if(sourceInfo.facing == (isFront ? "front" : "back")) {
          videoSourceId = sourceInfo.deviceId;
          console.log(sourceInfo);
        }
      }
      mediaDevices.getUserMedia({
        audio: true,
        video: {
          mandatory: {
            minWidth: 500, // Provide your own width, height and frame rate here
            minHeight: 300,
            minFrameRate: 30
          },
          facingMode: (isFront ? "user" : "environment"),
          optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
        }
      })
      .then(stream => {
        // Got stream!
        console.log("getUserMedia----stream",stream);
        this.setState({
            localVideoStream:stream,
            localStreamURL: stream.toURL()
          })
      })
      .catch(error => {
        // Log error
        console.log(error);
      });
    });

    //handling join call
    if(caller){
      this.handleJoin();
    }
  }

  onCallHangUp=()=>{
      this.props.navigation.goBack();
  }
   
  render() {
      return (
          <View style={styles.root}>
              <RTCView streamURL={this.state.remoteStreamURL} style={styles.localVideo} />
              <RTCView streamURL={this.state.localStreamURL} style={styles.remoteVideo} />
              <View style={styles.buttonContainer}>
                  <TouchableHighlight style={[styles.button, styles.buttonCall]} onPress={() => this.onCallHangUp()}>
                      <Image style={styles.icon} source={{uri: 'https://png.icons8.com/call/win8/100/ffffff'}}/>
                  </TouchableHighlight>
              </View>
          </View>
      )
  }
}


export default Videocall;

const remoteVideoWidth=Math.round(screenWidth-114);

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
      backgroundColor:"black",
      position: "absolute"
    },
    remoteVideo: {
      top: 0,
      left: remoteVideoWidth,
      width: 114,
      height: 170,
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
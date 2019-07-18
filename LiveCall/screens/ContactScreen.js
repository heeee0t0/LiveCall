import React, { Component } from 'react';
import styled from "styled-components";
import { TouchableOpacity, Dimensions } from "react-native";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

export default class ContactScreen extends Component {
    static navigationOptions={
        title: "Join call"
      }

    render() {
        return (
            <Container>
                <ProfileImage source={require("../assets/images.jpg")}></ProfileImage>
                <Name>Rahul</Name>
                <Status></Status>
                <TouchableOpacity
                 onPress={() => {
                     this.props.navigation.push("VideoCall");
                 }}
                >
                <Cover>
                    <Text>Join</Text>
                </Cover>
                </TouchableOpacity>
            </Container>
        )
    }
}

const Container=styled.View`
    flex:1;
    background-color:#e9e9ec;
    justify-content:center;
    align-items:center;
`;

const ProfileImage=styled.Image`
    width:200px;
    height:200px;
    background:black;
    border-radius:100px;
`;

const Join=styled.View`
    background:black;
`;

const Status=styled.Text`
font-size: 16px;
color: black;
font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
  align-items:flex-end;
  padding-top:20px;
`;

const Cover=styled.View`
    width:100px;
    height:40px
    background-color:black;
    align-items:center;
    border-radius: 14px;
`;

const Text = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: bold;
  padding-top:6px;
  align-items:flex-end
`;
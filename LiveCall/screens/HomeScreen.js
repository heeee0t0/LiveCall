import React, { Component } from 'react';
import {
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Animated,
    Easing,
    StatusBar,
    Platform
  } from "react-native";
import styled from "styled-components";
import ProfileHeader from "../components/ProfileHeader";
import ActiveContact from "../components/ActiveContact";

export default class HomeScreen extends Component {
  static navigationOptions={
    header: <ProfileHeader/>
  }

    render() {
        return (
            <Container>
                <Subtitle>{"Active"}</Subtitle>
                <ScrollView style={{ height: "100%" }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.push("Contact");
                      }}
                    >
                      <ContactContainer>
                        <ActiveContact/>
                      </ContactContainer>
                    </TouchableOpacity>
                </ScrollView>
            </Container>
        )
    }
}


const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;


const ActiveContacts=styled.View`
  flex: 1;
  top: 115px;
  left: 0;
  background:#f0f3f5;
  width: 100%;
  height: 100%;
  position: absolute;
  flex-wrap: wrap;
  flex-direction: row;
`;

const ContactContainer=styled.View`
  flex-direction:row;
  padding-left: 0px;
`;

const ContactImage=styled.Image`
  width:44px;
  height:44px;
  background:black;
  border-radius:22px;
  margin-top:15px;
  margin-left:20px;
  position:absolute;
  top:0;
  left:0;
`;

const ContactName = styled.Text`
  font-size: 18px;
  color: #3c4560;
  font-weight: bold;
  margin-top:20px;
`;
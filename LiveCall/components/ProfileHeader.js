import React, { Component } from 'react';
import styled from "styled-components";
import { NotificationIcon } from "../components/Icons";

export default class ProfileHeader extends Component {
    render() {
        return (
            <HeaderContainer>
                <Avatar source={require("../assets/images.jpg")}/>
                <Name>Prakhyath Shetty</Name>
                <Title>LiveCall</Title>
                <NotificationIcon style={{position:"absolute",right:28,top:5}}/>
            </HeaderContainer>
        )
    }
}

const Avatar=styled.Image`
  width:44px;
  height:44px;
  background:black;
  border-radius:22px;
  margin-left:20px;
  position:absolute;
  top:0;
  left:0;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const HeaderContainer = styled.View`
  width: 100%;
  margin-top: 10px;
  padding-left: 80px;
  padding-bottom: 10px;
`;
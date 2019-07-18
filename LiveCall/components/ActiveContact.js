import React from 'react';
import styled from "styled-components";
import { NotificationIcon } from "../components/Icons";

const ActiveContact = props => (
    <Container>
      <ContactImage source={require("../assets/images.jpg")} />
      <ContactName>{"Rahul"}</ContactName>
      <Caption>Active now</Caption>
  </Container>
);

export default ActiveContact;

const ContactImage=styled.Image`
width:44px;
height:44px;
background:black;
border-radius:22px;
margin-left:20px;
position:absolute;
top:0;
left:0;
`;

const Container = styled.View`
width: 100%;
margin-top: 10px;
padding-left: 80px;
padding-bottom: 10px;
`;

const ContactName = styled.Text`
font-size: 17px;
color: #3c4560;
font-weight: bold;
`;

const Caption = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight:300;
`;
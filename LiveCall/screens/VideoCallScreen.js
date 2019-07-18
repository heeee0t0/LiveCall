import React, { Component } from 'react';
import styled from "styled-components";
import { View } from "react-native";

export default class VideoCallScreen extends Component {
    static navigationOptions={
        header:null
      }

    render() {
        return (
            <FullVideo>
                <LocalVideo>

                </LocalVideo>
                <RemoteVideo>

                </RemoteVideo>
            </FullVideo>
        )
    }
}

const FullVideo=styled.View`
flex:1;
background-color:black;
justify-content:center;
align-items:center;
`;

const LocalVideo=styled.View`
    top: 0;
    left: 0;
    background-color: red;
    position: absolute;
`;

const RemoteVideo=styled.View`
top: 0;
left: 284;
width: 107.94px;
height: 163.29px;
background-color: white;
position: absolute;
`;

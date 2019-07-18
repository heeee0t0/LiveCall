import React from 'react'
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Videocam = () => (
  <Svg viewBox="0 0 512 512">
    <Path d="M384 219.5v-85.2c0-13.4-11.2-24.3-24.9-24.3H56.9C43.2 110 32 120.9 32 134.3v243.3C32 391 43.2 402 56.9 402h302.2c13.7 0 24.9-11 24.9-24.3v-85.2l96 97.3V122.2l-96 97.3z" />
  </Svg>
)

export const NotificationIcon = props => (
    <Svg width={24} height={24} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)" fill="#4775f2">
        <Path d="M20 10V8A8 8 0 0 0 4 8v2a4.441 4.441 0 0 1-1.547 3.193A4.183 4.183 0 0 0 1 16c0 2.5 4.112 4 11 4s11-1.5 11-4a4.183 4.183 0 0 0-1.453-2.807A4.44 4.44 0 0 1 20 10zM9.145 21.9a2.992 2.992 0 0 0 5.71 0c-.894.066-1.844.1-2.855.1s-1.961-.032-2.855-.1z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
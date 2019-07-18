import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

const HomeStack = createStackNavigator(
    {
      Home: HomeScreen,
      Section: SectionScreen
    },
    {
      mode: "modal"
    }
  );
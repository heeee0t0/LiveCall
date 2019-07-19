import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";

import WelcomeScreen from "../screens/WelcomeScreen";
import Login from "../screens/LogIn";
import Signin from "../screens/SignIn";
import Home from "../screens/Home";
import Joincall from "../screens/Joincall";
import Videocall from "../screens/Videocall";
import ContactScreen from "../screens/ContactScreen";
import VideoCallScreen from "../screens/VideoCallScreen";

const AppNavigator = createStackNavigator(
  {
    Login,
    Signin,
    Home,
    Joincall,
    Videocall,
    Contact: ContactScreen,
    VideoCall:VideoCallScreen
  },
  {
    mode: "modal"
  }
);

export default createAppContainer(AppNavigator);
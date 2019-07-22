import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "../screens/LogIn";
import Signin from "../screens/SignIn";
import Home from "../screens/Home";
import Joincall from "../screens/Joincall";
import Call from "../screens/Call";
import Videocall from "../screens/Videocall";


const AppNavigator = createStackNavigator(
  {
    Login,
    Signin,
    Home,
    Joincall,
    Call,
    Videocall
  },
  {
    mode: "modal"
  }
);

export default createAppContainer(AppNavigator);
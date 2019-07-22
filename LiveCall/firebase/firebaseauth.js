
import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyD0ErrThy7ynnbsjHp6h5uwr9qXzu3e_bs",
    authDomain: "webrtc-2dc76.firebaseapp.com",
    databaseURL: "https://webrtc-2dc76.firebaseio.com",
    projectId: "webrtc-2dc76",
    storageBucket: "webrtc-2dc76.appspot.com",
    messagingSenderId: "905817888832",
    appId: "1:905817888832:web:5573cac9ea59f5b4"
  };
  if(!firebase.app.length)
  {
    firebase.initializeApp(firebaseConfig);
  }
  else{
    firebase.initializeApp(firebaseConfig);
  }
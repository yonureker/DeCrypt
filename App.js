import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screens/loginScreen'
import SignupScreen from './screens/signupScreen'
import ProfileScreen from './screens/profileScreen'
import PasswordScreen from './screens/passwordScreen'

import * as firebase from "firebase";
import firebaseConfig from "./config/config";

// initialize firebase with the config file


//Reference to the database service
const database = firebase.database();

//Reference to the storage service
const storage = firebase.storage();

firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    'Authenticated'
  } else {
    'Not authenticated'
  }
})

export default function App() {
  return (
      <AppContainer />
  );
}

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    Profile: ProfileScreen,
    Password: PasswordScreen
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(AppNavigator);

import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screens/loginScreen'
import SignupScreen from './screens/signupScreen'
import DashboardScreen from './screens/dashboardScreen'

import * as firebase from "firebase";
import firebaseConfig from "./config";

// initialize firebase with the config file
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
      <AppContainer />
  );
}

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    Dashboard: DashboardScreen
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(AppNavigator);

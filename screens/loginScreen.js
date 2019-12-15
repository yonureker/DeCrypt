import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import * as firebase from "firebase";

const LoginScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => props.navigation.navigate("Dashboard"))
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginModule}>
        <View>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor="#D7DBDD"
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#D7DBDD"
            onChangeText={password => setPassword(password)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              loginUser(email, password);
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>Log In</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems:'center', marginTop: 15}}>
          <Text>
            -- or --
          </Text>
        </View>

        <View style={styles.socialLogin}>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#3B5998" }}
            onPress={() => {
              loginUser(email, password);
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>
              Log in with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#D73D32" }}
            onPress={() => {
              loginUser(email, password);
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>
              Log in with Google
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center', marginTop: 15}}>
          <Text>
            Don't have an account? Sign Up.
          </Text>
        </View>
      </View>
    </View>
  );
};

LoginScreen.navigationOptions = {
  title: "Log In"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  loginContainer: {
    width: "100%",
    minWidth: 400,
    borderWidth: 1,
    borderColor: 'black'
  },
  textInput: {
    width: "100%",
    minWidth: 350,
    minHeight: 50,
    borderWidth: 1.5,
    borderColor: "#D7DBDD",
    marginTop: 10,
    padding: 10
  },
  socialLogin: {
    marginTop: 10
  },
  button: {
    marginTop: 10,
    color: "#fff",
    backgroundColor: "green",
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LoginScreen;

import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as firebase from "firebase";

const PasswordScreen = props => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(firebase.auth().currentUser.email);

  const updatePassword = (email, password) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    firebase
      .auth().currentUser
      .linkWithCredential(credential)
      // set new user's name to name
      .then(() =>
        firebase.auth().currentUser.updateProfile({
          password: password
        })
      )
      .then(() => props.navigation.navigate("Profile", {
        credential: credential
      }))
      .then(() => Alert.alert("Password is added to your account."))
      .catch(function(error) {
        // Handling errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
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
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#D7DBDD"
            onChangeText={password => setPassword(password)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              updatePassword(email, password);
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>
              Update Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
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
    borderColor: "black"
  },
  textLink: {
    color: "#49AEB5"
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
  },
});

export default PasswordScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

const SignupScreen = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupUser = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      // set new user's name to name
      .then(() =>
        firebase.auth().currentUser.updateProfile({
          displayName: name
        })
      )
      .then(() => props.navigation.navigate("Profile"))
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

  const loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync("567945563749281");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        // Get the user's id, name and email using Facebook's Graph API
        // const response = await fetch(
        //   `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        // );

        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase
          .auth()
          .signInWithCredential(credential)
          .then(() => props.navigation.navigate("Profile"))
          .catch(error => {
            console.log(error);
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "691486029945-ab0tvpd5mcc9kej5s6u8ctip8jv0br5j.apps.googleusercontent.com",
        androidClientId:
          "691486029945-m1m7fm641el96u6de6kmsbcfk81kqrt8.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        // return console.log(result);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(() => props.navigation.navigate("Profile"))
          .catch(error => {
            console.log(error);
          });
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginModule}>
        <View>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Full Name"
            placeholderTextColor="#D7DBDD"
            onChangeText={name => setName(name)}
          />
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
              signupUser(email, password);
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", marginTop: 15 }}>
          <Text>-- or --</Text>
        </View>

        <View style={styles.socialLogin}>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#3B5998" }}
            onPress={() => {
              loginWithFacebook();
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>
              Sign up with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#D73D32" }}
            onPress={() => {
              loginWithGoogle();
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>
              Sign up with Google
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text>
            Already have an account?{" "}
            <Text
              style={styles.textLink}
              onPress={() => props.navigation.navigate("Login")}
            >
              Log In.
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

SignupScreen.navigationOptions = {
  title: "Sign Up"
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
  signupContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    flexDirection: "row"
  }
});

export default SignupScreen;

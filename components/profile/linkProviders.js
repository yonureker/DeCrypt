import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";
import firebaseConfig from "../../config/config"

import { withNavigation } from "react-navigation";

const LinkProviders = props => {
  const linkToFacebook = async () => {
    try {
      await Facebook.initializeAsync("567945563749281");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase
          .auth()
          .currentUser.linkWithCredential(credential)
          .then(() => Alert.alert("Your Facebook account is linked."))
          .then(() => props.navigation.navigate("Profile"))
          .catch(error => {
            Alert.alert(error);
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const linkToGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: firebaseConfig.iosClientId,
        androidClientId: firebaseConfig.androidClientId,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken
        );
        firebase
          .auth()
          .currentUser.linkWithCredential(credential)
          .then(() => Alert.alert("Your Google account is linked."))
          // .then(() => props.navigation.navigate("Profile"))
          .catch(error => {
            Alert.alert(error);
          });
      } else {
        return { cancelled: true };
      }

      // props.navigation.navigate("Profile")
    } catch (e) {
      return { error: true };
    }
  };
  // props.providers => ["facebook.com", "google.com"]

  return props.providers.map((provider, index) => {
    switch (provider) {
      case "facebook.com":
        return (
          <TouchableOpacity
            key={index}
            style={{ ...styles.button, backgroundColor: "#3B5998" }}
            onPress={() => {
              linkToFacebook();
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>
              Link to Facebook
            </Text>
          </TouchableOpacity>
        );
      case "google.com":
        return (
          <TouchableOpacity
            key={index}
            style={{ ...styles.button, backgroundColor: "#D73D32" }}
            onPress={() => {
              linkToGoogle();
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>
              Link to Google
            </Text>
          </TouchableOpacity>
        );
      case "password":
        return (
          <TouchableOpacity
            key={index}
            style={{ ...styles.button, backgroundColor: "#838888" }}
            onPress={() => {
              props.navigation.navigate("Password");
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>
              Link to Password
            </Text>
          </TouchableOpacity>
        );
      default:
        break;
    }
  });
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    color: "#fff",
    backgroundColor: "green",
    minHeight: 50,
    width: "80%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withNavigation(LinkProviders);

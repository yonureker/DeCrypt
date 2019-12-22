import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import * as firebase from "firebase";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import ProfilePhoto from "../components/profilePhoto";
import * as Facebook from "expo-facebook";

const ProfileScreen = props => {
  const logoutUser = () =>
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          console.log("Signed Out");
        },
        function(error) {
          console.error("Sign Out Error", error);
        }
      )
      .then(props.navigation.navigate("Login"));

  const linkToFacebook = async () => {
    try {
      await Facebook.initializeAsync("567945563749281");
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase
          .auth()
          .currentUser.linkWithCredential(credential)
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

  const linkToGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "691486029945-ab0tvpd5mcc9kej5s6u8ctip8jv0br5j.apps.googleusercontent.com",
        androidClientId:
          "691486029945-m1m7fm641el96u6de6kmsbcfk81kqrt8.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken
        );
        firebase
          .auth()
          .currentUser.linkWithCredential(credential)
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

  const toBeLinked = () => {
    // the array of all selected linking options
    const allLinkingOptions = ["facebook.com", "google.com", "password"]

    // the array of already linked login options
    const alreadyLinked = firebase.auth().currentUser.providerData.map((el) => el.providerId)

    // filter array 2 from array 1 and find not linked login options
    const notLinkedYet = allLinkingOptions.filter(x => !alreadyLinked.includes(x))

    return notLinkedYet;
  }

  const currentUser = firebase.auth().currentUser;
  
  

  return (
    <View style={styles.container}>
      {console.log(currentUser.providerData.map((el) => el.providerId))}
      {console.log(toBeLinked())}
      <View style={styles.userInfoContainer}>
        <View style={{ marginBottom: 50 }}>
          <ProfilePhoto currentUser={currentUser}></ProfilePhoto>
        </View>
        <View style={{ width: "50%" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="email" size={32} color="black" />
            <Text style={{ marginLeft: 5 }}>{currentUser.email}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="account-box" size={32} color="black" />
            <Text style={{ marginLeft: 5 }}>{currentUser.displayName}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{...styles.button, backgroundColor: '#3B5998'}}
        onPress={() => {
          linkToFacebook();
        }}
      >
        <Text style={{ fontSize: 20, color: "#ffffff" }}>Link to Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{...styles.button, backgroundColor: '#D73D32'}}
        onPress={() => {
          linkToGoogle();
        }}
      >
        <Text style={{ fontSize: 20, color: "#ffffff" }}>Link to Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{...styles.button, backgroundColor: '#838888'}}
        onPress={() => {
          linkToPassword();
        }}
      >
        <Text style={{ fontSize: 20, color: "#ffffff" }}>Link to Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          logoutUser();
        }}
      >
        <Text style={{ fontSize: 20, color: "#ffffff" }}>Log Out</Text>
      </TouchableOpacity>
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
  userInfoContainer: {
    width: "80%",
    alignItems: "center",
    marginBottom: 50
  },
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

ProfileScreen.navigationOptions = {
  title: "Profile",
  headerLeft: null
};

export default ProfileScreen;

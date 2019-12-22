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

  const currentUser = firebase.auth().currentUser;
  

  return (
    <View style={styles.container}>
      {console.log(currentUser.providerData)}
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

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import * as firebase from "firebase";
import { Ionicons } from '@expo/vector-icons';

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

  const currentUser = firebase.auth().currentUser
  console.log(firebase.auth().currentUser);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
      <Text>Email: {currentUser.email}</Text>
      <Text>Name: {currentUser.displayName}</Text>
      </View>
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
  userInfo: {
    width: "80%",
    borderColor: '#ccc',
    borderWidth: 1
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

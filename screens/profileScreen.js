import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { MaterialIcons } from "@expo/vector-icons";

import ProfilePhoto from "../components/profile/profilePhoto";
import LinkProviders from "../components/profile/linkProviders";

const ProfileScreen = props => {
  const [currentUser, setCurrentUser] = useState(firebase.auth().currentUser);

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

  return (
    <View style={styles.container}>
      {console.log("rendering profile page")}
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

      <LinkProviders currentUser={currentUser} />
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

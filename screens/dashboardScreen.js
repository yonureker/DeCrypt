import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import * as firebase from "firebase";

const DashboardScreen = props => {
  console.log(props);

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
      .then(props.navigation.navigate('Login'))

  return (
    <View style={styles.container}>
      <Text>User Email: {props.navigation.state.params.email}</Text>

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
  button: {
    marginTop: 10,
    color: "#fff",
    backgroundColor: "green",
    minHeight: 50,
    width: '80%',
    alignItems: "center",
    justifyContent: "center"
  }
});

DashboardScreen.navigationOptions = {
  title: "Dashboard",
  headerLeft: null
};

export default DashboardScreen;

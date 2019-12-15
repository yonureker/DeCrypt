import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const DashboardScreen = (props) => {
  console.log(props)
  return(
  <View>
    <Text>DashboardScreen</Text>
  </View>

  )
}

DashboardScreen.navigationOptions = {
  title: "Dashboard"
};

export default DashboardScreen;
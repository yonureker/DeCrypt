import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfilePhoto = props => {

  const photoStatus = () => {
    if (props.currentUser.photoURL === null) {
      return <MaterialCommunityIcons name="face-profile" size={100} color="black" />
    } else {
      return <Image style={styles.profilePhoto} source={{uri: `${props.currentUser.photoURL}` }} />
    }
  }

  return(
    <View>
      {photoStatus()}
    </View>
  )
}

const styles = StyleSheet.create({
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
})

export default ProfilePhoto;
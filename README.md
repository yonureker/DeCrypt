## React Native | Firebase Login Starter

A simple React Native & Firebase app that allows merging multiple auth methods into a single account.

![Image](https://i.imgur.com/uhVfFTf.png)

### Dependencies

* react-native (Frontend)
* firebase (User management)
* react-navigation (Navigation)
* react-navigation-stack (Stack Navigator)
* expo-facebook (FB authentication)
* expo-google-app-auth (Google authentication)
* @expo/vector-icons (Icons on Profile Page)

### Requirements

* Clone the code and run `npm install`
* Firebase [config object](https://firebase.google.com/docs/web/setup#config-object) is required to run this project. I have also added iosClientID and androidClientID keys for [Google Log In](https://docs.expo.io/versions/latest/sdk/google/).

```
export default firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  iosClientId: "",
  androidClientId: "",
};
```





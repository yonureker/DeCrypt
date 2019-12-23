## React Native | Firebase Login Starter

A basic react native & firebase app that allows merging multiple auth methods into a single account.

![Image](https://i.ibb.co/Zx88tCy/firebase-multiple-auth.png)

:factory: Built with Firebase and React Native.

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




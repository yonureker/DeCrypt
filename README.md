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

## Login Functions

### Facebook Login

```
const loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync("567945563749281");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase
          .auth()
          .signInWithCredential(credential)
          .then(() => props.navigation.navigate("Profile"))
          .catch(error => {
            console.log(error);
          });
      } else {
        type === "cancel";
        Alert.alert("Login cancelled");
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
```

### Google Log In:

```
const loginWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: clientId.iosClientId,
        androidClientId: clientId.androidClientId,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(() => props.navigation.navigate("Profile"))
          .catch(error => {
            console.log(error);
          });
      } else {
        Alert.alert("Login cancelled");
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
```

### Login with Email and Password

```
const loginUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => props.navigation.navigate("Profile"))
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };
```

## Linking multiple auth methods

### Linking Facebook login

```
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
          **.currentUser.linkWithCredential(credential)**
          // .then(() => setCounter(counter + 1))
          .then(() =>
            props.navigation.navigate("Profile", {
              credential: credential
            })
          )
          .then(() => Alert.alert("Your Facebook account is linked."))
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
```






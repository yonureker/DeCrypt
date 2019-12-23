## React Native | Firebase Login Starter

A simple React Native & Firebase app that allows merging multiple auth methods into a single account.

![Image](https://i.imgur.com/uhVfFTf.png)

### Dependencies

- react-native (Frontend)
- firebase (User management)
- react-navigation (Navigation)
- react-navigation-stack (Stack Navigator)
- expo-facebook (FB authentication)
- expo-google-app-auth (Google authentication)
- @expo/vector-icons (Icons on Profile Page)

### Requirements

- Clone the code and run `npm install`
- Firebase [config object](https://firebase.google.com/docs/web/setup#config-object) is required to run this project. I have also added iosClientID and androidClientID keys for [Google Log In](https://docs.expo.io/versions/latest/sdk/google/).

```javascript
export default firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  iosClientId: "",
  androidClientId: ""
};
```

## Login Functions

### Facebook Login

```javascript
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

```javascript
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

```javascript
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

To link an additional method, we simply login via that method first and use `firebase.auth().currentUser.linkWithCredential(credential)` with the received credentials object.

### Linking Facebook login

```javascript
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
        .currentUser.linkWithCredential(credential)
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

### Linking Google Login

```javascript
const linkToGoogle = async () => {
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
        .currentUser.linkWithCredential(credential)
        .then(() =>
          props.navigation.navigate("Profile", {
            credential: credential
          })
        )
        .then(() => Alert.alert("Your Google account is linked."))
        .catch(error => {
          Alert.alert(error);
        });
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};
```

### Adding password to an existing account

```javascript
const updatePassword = (email, password) => {
  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    password
  );

  firebase
    .auth().currentUser
    .linkWithCredential(credential)
    // set new user's name to name
    .then(() =>
      firebase.auth().currentUser.updateProfile({
        password: password
      })
    )
    .then(() => props.navigation.navigate("Profile", {
      credential: credential
    }))
    .then(() => Alert.alert("Password is added to your account."))
    .catch(function(error) {
      // Handling errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
```

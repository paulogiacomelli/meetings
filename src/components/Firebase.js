import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'


// Initialize Firebase
const config = {
    apiKey: "AIzaSyATeTUmBJoIN3dSA6L_QuHHT6ApS8ZsFSg",
    authDomain: "meetingsapp-13cf4.firebaseapp.com",
    databaseURL: "https://meetingsapp-13cf4.firebaseio.com",
    projectId: "meetingsapp-13cf4",
    storageBucket: "meetingsapp-13cf4.appspot.com",
    messagingSenderId: "756495238056"
  };
  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider()
  export const auth = firebase.auth();

  export default firebase

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAlwmFtBawO5fhLnXVpRdPudlEcwhZ4UUg",
  authDomain: "facebook-messenger-clone-6f5e1.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-6f5e1.firebaseio.com",
  projectId: "facebook-messenger-clone-6f5e1",
  storageBucket: "facebook-messenger-clone-6f5e1.appspot.com",
  messagingSenderId: "334492749111",
  appId: "1:334492749111:web:8956cbd1aa3b4c3d745eb2",
  measurementId: "G-WYG5MNQZS4"
});

const db = firebaseApp.firestore()

export default db;
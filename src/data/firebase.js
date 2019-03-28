import firebase from "firebase";

// Initializing Firebase's realtime database for application.
var config = {
  apiKey: "AIzaSyCFf7aVJtapvJ8uZaYC1WfyuCt9SHQL9i0",
  authDomain: "coaction-db.firebaseapp.com",
  databaseURL: "https://coaction-db.firebaseio.com",
  projectId: "coaction-db",
  storageBucket: "coaction-db.appspot.com",
  messagingSenderId: "38505436483"
};

var firebaseDB = firebase.initializeApp(config);
export default firebaseDB;

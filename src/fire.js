import firebase from 'firebase';


  var firebaseConfig = {
    apiKey: "AIzaSyD4nXqbAtSxCNYDuuCWyvzQ1F17t157SoQ",
    authDomain: "login-483fa.firebaseapp.com",
    databaseURL: "https://login-483fa.firebaseio.com",
    projectId: "login-483fa",
    storageBucket: "login-483fa.appspot.com",
    messagingSenderId: "624139124901",
    appId: "1:624139124901:web:f146f2bea4c700108ecd4c"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;
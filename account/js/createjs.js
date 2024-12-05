import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
 getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
  sendEmailVerification
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDB-75ye1J71GxZFH2Gt1bBG89sNNVIey8",
    authDomain: "ripnines-b7119.firebaseapp.com",
    projectId: "ripnines-b7119",
    storageBucket: "ripnines-b7119.firebasestorage.app",
    messagingSenderId: "541327244207",
    appId: "1:541327244207:web:2502bfb6ddfa1d25a6cd5a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  
    //___________________________________________
var link = localStorage.getItem('link');
 
     // ..
  
    function emailVeri() {
   sendEmailVerification(auth.currentUser)
    .then(() => {
  
    });

  }
  
   function signUpEmail(email,password) {
  
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    
    var user = userCredential.user;
    
    emailVeri()
    localStorage.setItem('email', document.getElementById('email').value); 
    window.location.replace('https://ripnines.github.io/account/confirmemail');

    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error('Error signing in:', errorCode, errorMessage); 
    // ..
  });
  
  }
  

    
  //___________________________________________
  
  document.getElementById('signbutton').onclick = function() {
  
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  signUpEmail(email, password);
  
};
  
  

  
  
  
  
  

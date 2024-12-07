import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
 getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
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


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
      //___________________________________________
  
  document.getElementById('error').style.color = "#020B0D";
  
    //___________________________________________
    
   function signInEmail(email,password) {
 
	 signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  var user = userCredential.user;
  
   if (user.emailVerified) {
     var link = localStorage.getItem('link');
    var linkRightNow = link;
    localStorage.removeItem('link');
    window.location.replace(link);
    }
    
    else {
     console.error('Not verified'); 
    document.getElementById('error').style.color = "#E81818";
    document.getElementById('error').textContent = "verify email";
    signOut(auth);
       }
   
  })
 
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error('Error signing in:', errorCode, errorMessage); 
    var errorfortext = errorCode.replace("auth/", "").replace("-", " ");
    document.getElementById('error').style.color = "#E81818";
    document.getElementById('error').textContent = errorfortext;
  });
  
  }
    
  //___________________________________________
  
  document.getElementById('signbutton').onclick = function() {
  
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  signInEmail(email, password);
  
};
  
  

  
  
  
  
  

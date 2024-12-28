import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  connectAuthEmulator,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB-75ye1J71GxZFH2Gt1bBG89sNNVIey8",
  authDomain: "ripnines-b7119.firebaseapp.com",
  projectId: "ripnines-b7119",
  storageBucket: "ripnines-b7119.firebasestorage.app",
  messagingSenderId: "541327244207",
  appId: "1:541327244207:web:2502bfb6ddfa1d25a6cd5a",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

//------------------------------------------------

//------------------------------------------------
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("name").value = user.displayName;

 window.updateProfileGlobal = function () {
    updateProfile(user, {displayName: document.getElementById("name").value})
    .then(() => {
        var displayName = user.displayName;
        document.getElementById("name").textContent = displayName;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
        var errorfortext = errorCode.replace("auth/", "").replace("-", " ");
        document.getElementById("error").style.color = "#E81818";
        document.getElementById("error").textContent = errorfortext;
    });
}

 window.signOutGlobal = function () {
 signOut(auth);
 }
   
  } else {
    console.log("not signedin")
    document.getElementById("error").style.color = "#E81818";
    document.getElementById("error").textContent = "not signed in";
    localStorage.setItem("link", window.location.href);
    //  window.location.href ="https://ripnines.github.io/account/signin";
  }
  
})

 document.getElementById("finish").onclick = function () {
      updateProfileGlobal();
     var link = localStorage.getItem('link');
     if (link) {
       var linkRightNow = link;
    localStorage.removeItem('link');
      window.location.href = link
     } else {
        window.location.href = "https://ripnines.github.io/"
     }
  
    }
    
     document.getElementById("signout").onclick = function () {
     signOutGlobal();
     var link = localStorage.getItem('link');
    var linkRightNow = link;
    localStorage.removeItem('link');
      window.location.href = "https://ripnines.github.io/account/signin";
    }

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

import {

  getAuth,
  onAuthStateChanged,
  connectAuthEmulator,
  
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyDB-75ye1J71GxZFH2Gt1bBG89sNNVIey8",
  authDomain: "ripnines-b7119.firebaseapp.com",
  projectId: "ripnines-b7119",
  storageBucket: "ripnines-b7119.firebasestorage.app",
  messagingSenderId: "541327244207",
  appId: "1:541327244207:web:2502bfb6ddfa1d25a6cd5a",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

//------------------------------------------------

//------------------------------------------------
function uploadsong1(user) {
 console.log("it ran");
    var songname = document.getElementById("name").textContent;
    var artistname = document.getElementById("artists").textContent;
    db.collection("users").doc(`${user.uid}`).collection("songs").add({
    
    artist: `${artistname}`,
    name: `${songname}`,
    streams: 0
    
    }) .then((docref) => {
      console.log(docref);
    }) .catch((error) => {
    console.error(error);
    });
 
}

auth.onAuthStateChanged((user) => {
  if (user) {
  window.uploadsong2 = function() {
  uploadsong1(user);
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
     console.log("helloo");
		uploadsong2(auth.currentUser);
    }

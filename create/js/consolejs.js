import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"

import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  connectAuthEmulator,
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

//------------------------------------

var profilelink
const songarray= [];
//getting songs from database------------------------------------

async function getsongs(user) {

  try { //gets songs and makes the song left things 
    const songref = await getDocs(collection(db, "users", user.uid, "songs"))
    
    let count = 0;
    
    songref.forEach((doc) => {
      let data = Object.values(doc.data());
			songarray.push(doc.data());

      var htmlforsong = `<p class='songleft' data-songid='${count}'>hello</p>`;
      
      const eachsong = document.getElementById("left").insertAdjacentHTML("beforeend", htmlforsong);
			count = count + 1;
  
    })
  } catch (error) {
    console.log(error)
  }
  
  //functions for the onmousedown of each song when presened
  
  const songbutton = document.querySelectorAll(".songleft");

songbutton.forEach(songleft => {
const songid = songleft.getAttribute("songid");

songleft.onmousedown = function() {
const songdata = songarray[songid];

      const artists = songdata["artists"];
      const coverurl = songdata["coverurl"];
      const mainartist = songdata["mainartist"];
      const musicurl = songdata["musicurl"];
      const name = songdata["name"];
      const streams = songdata["streams"];
      
      console.log(artists,coverurl,mainartist,musicurl,name,streams)
      
}


});

}

//profilesigninthing------------------------------------

auth.onAuthStateChanged((user) => {
  if (user) {
    //change user profile------------------------------------

    var uid = user.uid
    profilelink = "https://ripnines.github.io/account/profile";

    if (user.displayName) {
      document.getElementById("signin").textContent = user.displayName;
    } else {
      document.getElementById("signin").textContent = "Name";
    }

    //call the get song thiong------------------------------------

    getsongs(user)

    //change the picture and link------------------------------------
  } else {
    console.log("not signedin")
    profilelink = "https://ripnines.github.io/account/signin";
    document.getElementById("signin").textContent = "Sign In";
  }
})

//------------------------------------

document.getElementById("signin").onmousedown = function () {
  localStorage.setItem("link", window.location.href)
  console.log(profilelink)
  window.location.href = profilelink
}

//------------------------------------

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  
  import { 

	getFirestore, 
	collection, 
	addDoc, 
  updateDoc,
  getDoc,
  getDocs,
	doc

  
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

import {
 getAuth,
  onAuthStateChanged, 
  signOut,
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
//------------------------------------

var profilelink;

//getting songs from database------------------------------------

async function getsongs(user) {

try {
const songRef = await getDocs(collection(db,"users", user.uid, "songs"));
songRef.forEach((doc) => {


var data = doc.data;
var artists = data.artists;
var coverurl = data.coverurl;
var mainartist = data.mainartist;
var musicurl = data.musicurl;
var name = data.name;
var streams = data.streams;


console.log(artists,coverurl,mainartist,musicurl,name,streams);


});

} catch(error) {
console.log(error)
}

}



//profilesigninthing------------------------------------

  auth.onAuthStateChanged((user) => {
	if (user)  {
  
  //change user profile------------------------------------
  
   var uid = user.uid;
   profilelink = "https://ripnines.github.io/account/profile";
  
   if (user.displayName) {
    document.getElementById('signin').textContent = user.displayName;
   } else {
    document.getElementById('signin').textContent = "Name";
   }
   
  //change user profile------------------------------------
  
  getsongs(user);
   
 //change the picture and link------------------------------------
  
  } else {
  console.log("not signedin")
  profilelink = "https://ripnines.github.io/account/signin";
  document.getElementById('signin').textContent = "Sign In";
  }

});

//------------------------------------

document.getElementById('signin').onmousedown = function() {
localStorage.setItem('link', window.location.href); 
console.log(profilelink)
window.location.href = profilelink;

}

//------------------------------------

function createhtml(html) {
var frag = document.createDocumentFragment(),
		temp = document.createElement('div');
    temp.innerHTML = html;
    while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
    return frag;
    }
}

//var fragment = createhtml("");

//document.body.insertBefore(fragment,document.body.childNodes[0]);

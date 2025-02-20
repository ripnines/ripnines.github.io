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

var profilelink;
const songarray= [];
var docidcurrent= null;

//link chckers------------------------------------

var imagevalid = false;
var audiovalid = false;
var completed = null;

//handles all erroers -------------------------------

function errors(text) {
    document.getElementById("error").style.color = "#E81818";
    document.getElementById("error").textContent = text;
    console.error(text);
}

function errorsreset(){
    document.getElementById("error").style.color = "#020B0D";
    document.getElementById("error").textContent = "";
}

//getting songs from database------------------------------------

async function getsongs(user) {

  try { //gets songs and makes the song left things 
    const songref = await getDocs(collection(db, "users", user.uid, "songs"))
    
      let count = 0
      songref.forEach((doc) => {
      
			songarray.push(doc.data()); //adds object into array with the doc.id as its name
      
      let data = doc.data()
      let docid = doc.id
			const name = data["name"];
      const mainartist = data["mainartist"] ;
      var artists = data["artists"] ;
			
      //quick format of additonal artists
      if (artists == null) {
      artists = "";
      } else {
      artists = "," + artists
      }

			const title = name + " by " + mainartist + artists

      var htmlforsong = `<p class='songleft' songid='${count}' docid='${doc.id}'>${title}</p>`;
 
      const eachsong = document.getElementById("left").insertAdjacentHTML("beforeend", htmlforsong);
  	  count = count + 1
  
    })
  } catch (error) {
    console.log(error)
  }
  
  //functions for the onmousedown of each song when pressed
  
const songbutton = document.querySelectorAll(".songleft");

songbutton.forEach(songleft => {

songleft.onmousedown = function() {
		const docid = songleft.getAttribute("docid");
		const songid = songleft.getAttribute("songid");
		const songdata = songarray[songid];
    
    console.log(songid);
        console.log(songdata);
        console.log(songarray);

		const artists = songdata["artists"];
		const coverurl = songdata["coverurl"];
		const mainartist = songdata["mainartist"];
		const musicurl = songdata["musicurl"];
		const name = songdata["name"];
		const streams = songdata["streams"];
      console.log(artists,coverurl,mainartist,musicurl,name,streams)
      
    docidcurrent = docid;
    
    document.getElementById("cover").src = coverurl;   
		document.getElementById("coverurl").value = coverurl;
		document.getElementById("name").value = name;
		document.getElementById("artists").value = artists
		document.getElementById("musicurl").value = musicurl
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

//system to make link back after you sign in------------------------------------

document.getElementById("signin").onmousedown = function () {
  localStorage.setItem("link", window.location.href)
  console.log(profilelink)
  window.location.href = profilelink
}

//song updator ----------------------------------------

async function updatesong(user, docid) {
		mainartist = user.displayName
    name = document.getElementById("name").value; //-name like song name
    artists = document.getElementById("artists").value; //coartists
    musicurl = document.getElementById("musicurl").value;
    coverurl = document.getElementById("coverurl").value;
    
    if (!name || !artists || !musicurl || !coverurl) {
   errors("missing values");
   console.log(name,artists, musicurl, coverurl);
   
   return;
    }
    
   if (!imagevalid) {
   errors("image error");
   console.log("unsuitable image");
   return;
   }
   
   if (!audiovalid) {
   errors("audio error");
   console.log("unsuitable audio");
   return;
   }
    
    try {
    const uploadRef = await updateDoc(doc(db,"users", user.uid, "songs", docid), {  
    mainartist: mainartist,
    artists: artists,
    name: name,
    musicurl: musicurl,
    coverurl: coverurl,

    });
 
    completed = true;


    } catch(error) {
       completed = false;

  }

}

//image checker ----------------------------------------

document.getElementById("coverurl").addEventListener("keyup", function() {
imagechanger()
})
document.getElementById("coverurl").addEventListener("paste", function() {
imagechanger()
})

async function imagechecker(image,callback) {

try {
const extensions = ["jpg","png","jpeg","svg","webp"];
const formatted = image.split('.').pop().toLowerCase();
var response;
if (extensions.includes(formatted)) {


response = await fetch(image, {method: 'HEAD', mode: 'no-cors'});
if (!response.ok || !response) {
callback(false);
return;
}

const contenttype = response.headers.get('Content-Type');
if (contenttype && contenttype.startsWith('image/')) {
callback(true);
} else {
callback(false);
}

} else {
callback(false);
return;
}

} catch(error) {
callback(false);
}
  
}

function imagechanger() {

let a  = document.getElementById("coverurl").value;
if (a) {

  imagechecker(a, (valid) => {
  if (valid) {
	document.getElementById("coverimg").src = a;
  imagevalid = true;
  } else {
  document.getElementById("coverimg").src = "https://ripnines.github.io/images/imagepictureerror.png";
  imagevalid = false;
  }
  
  })
  
} else {
	document.getElementById("coverimg").src = "https://ripnines.github.io/images/imagepicture.png";
	imagevalid = false;
}

}

//audio------------------------------------------------

document.getElementById("musicurl").addEventListener("keyup", function() {
audiochanger()
})
document.getElementById("musicurl").addEventListener("paste", function() {
audiochanger()
})

	var testaudio = new Audio();
	testaudio.src = "";

async function audiochecker(audio,callback) {

try {
const extensions = ["mp3","wav","ogg","mp3","flac","aac","m4a",];
const formatted = audio.split('.').pop().toLowerCase();
var response;
if (extensions.includes(formatted)) {

response = await fetch(audio, {method: 'HEAD', mode: 'no-cors'});
if (!response.ok || !response) {

callback(false);
return;
}

const contenttype = response.headers.get('Content-Type');
if (contenttype && contenttype.startsWith('audio/')) {
callback(true);
} else {
callback(false);
}

} else {
callback(false);
return;
}

} catch(error) {
callback(false);
}
  
}

var ispaused = false;

function audiochanger() {

let a  = document.getElementById("musicurl").value;
if (a) {

  audiochecker(a, (valid) => {
  if (valid) {
  if (!ispaused) {
    document.getElementById("playicon").src = "https://ripnines.github.io/images/playicon.png"
  }
  audiovalid = true;
  } else {
  document.getElementById("playicon").src = "https://ripnines.github.io/images/playiconerror.png";
  audiovalid = false;
  testaudio.pause();
  }
  
  })
  
} else {
 
    document.getElementById("playicon").src = "https://ripnines.github.io/images/playicon.png"

	audiovalid = false;
  testaudio.pause();
}

}

var playiconcount = 1

document.getElementById("playicon").onmousedown = function () { 
var inputed = document.getElementById("musicurl").value;
if (audiovalid == true)  {
if (testaudio.src != inputed) {
testaudio.src = inputed;
}
if (playiconcount == 1) {
testaudio.play();
playiconcount = 2;
document.getElementById("playicon").src = "https://ripnines.github.io/images/pauseicon.png";
ispaused = true;
} else {
testaudio.pause();
playiconcount = 1
document.getElementById("playicon").src = "https://ripnines.github.io/images/playicon.png";
ispaused = false;
}
 
}

}

//upload button-----------------------------------

 document.getElementById("finish").onmousedown = function () {
 if (docidcurrent != null) {
 	uploadsong(auth.currentUser, docidcurrent);
 }
}


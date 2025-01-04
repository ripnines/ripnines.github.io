import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"

import { 

	getFirestore, 
	collection, 
	addDoc, 
  updateDoc,
	doc 
  
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

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

var imagevalid = false;
var audiovalid = false;

var mainartist;
var name; 
var artists; 
var musicurl; 
var coverurl;

var completed = null;

//------------------------------------------------
function errors(text) {
    document.getElementById("error").style.color = "#E81818";
    document.getElementById("error").textContent = text;
    console.error(text);
}

function errorsreset(){
    document.getElementById("error").style.color = "#020B0D";
    document.getElementById("error").textContent = "";
}

//------------------------------------------------

async function uploadsong(user) {
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
    await updateDoc(doc(db,"users", user.uid), {  
    name: user.displayName
    }) 
       errorsreset();
    } catch(error) {
       errors(error);
    
    }
    
    try {
    const uploadRef = await addDoc(collection(db,"users", user.uid, "songs"), {  
    mainartist: mainartist,
    artists: artists,
    name: name,
    musicurl: musicurl,
    coverurl: coverurl,
    streams: 0

    });
 
    completed = true;
    completion();

    } catch(error) {
       completed = false;
       completion();
        errors(error);
  }
    

    

}

//auth------------------------------------------------

auth.onAuthStateChanged((user) => {
  if (user) {
  window.uploadsong = function() {
  uploadsong(user);
  }
  } else {
		errors("not signed in");
    localStorage.setItem("link", window.location.href);
    //  window.location.href ="https://ripnines.github.io/account/signin";
  }
  
})

//image------------------------------------------------

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

//completion------------------------------------------------

function createhtml(html) {
var frag = document.createDocumentFragment(),
		temp = document.createElement('div');
    temp.innerHTML = html;
    while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
    return frag;
    }
}

function completion() {
if (completed == true) {
var fragment = createhtml("<div id='completionscreen'><img id = 'completionscreencheck' src='https://ripnines.github.io/images/checkicon.png'><img id = 'completionscreenimage' src='https://ripnines.github.io/images/imagepicture.png'><p id = 'songtitle' class= 'liltitle'>ghost town by brian</p><div class='butt' id = 'completionscreenbutton'><p >Finish</p></div></div>");

document.getElementById("completionscreenimage").src = coverurl
document.getElementById("songtitle").textContent = mainartist + "," + artists
document.getElementById("completionscreenbutton").onmousedown = function () {
 window.location.href = ""
 }



document.body.insertBefore(fragment,document.body.childNodes[0]);
} else {

}

}

//upload------------------------------------------------

 document.getElementById("finish").onmousedown = function () {
		uploadsong(auth.currentUser);
}

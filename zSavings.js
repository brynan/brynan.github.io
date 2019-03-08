// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

today = new Date();
month = today.getMonth();
month = (month * 1) + 1;
day = today.getDate();
year = today.getFullYear();
today = month+"/"+day+"/"+year;
document.getElementById("today").innerHTML = today;


// Requiring fs module in which  
// readFile function is defined. 
const fs = require('fs') 
  
fs.readFile('GData.txt', (err, data) => { 
    if (err) throw err; 
  
    console.log(data.toString()); 
}) 

// getBalance("GData.txt");
var GBalance = 100;
document.getElementById("GBalance").innerHTML = GBalance;

// getBalance("SData.txt");
var SBalance = 200;
document.getElementById("SBalance").innerHTML = SBalance;

function startRead() {
  // obtain input element through DOM

  var file = document.getElementById('file').files[0];
  if(file){
    getAsText(file);
  }
}


getAsText("GData.txt");

function getAsText(readFile) {
  var reader = new FileReader();
  alert(readFile);
  // Read file into memory as UTF-16
  reader.readAsText(readFile, "UTF-16");
  myString = reader.result;
  /* alert('myString'); */

  // Handle progress, success, and errors
  reader.onprogress = updateProgress;
  reader.onload = loaded;
  reader.onerror = errorHandler;
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    if (loaded < 1) {
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
    }
  }
}

function loaded(evt) {
  // Obtain the read file data
  var fileString = evt.target.result;
  // Handle UTF-16 file dump
  if(utils.regexp.isChinese(fileString)) {
    //Chinese Characters + Name validation
  }
  else {
    // run other charset test
  }
  // xhr.send(fileString)
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    // The file could not be read
  }
}

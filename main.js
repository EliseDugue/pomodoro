/// CSS ///

function CSSparams() {
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    document.body.style.zIndex = "-1"; 

    let countdown = document.getElementById("countdown");
    countdown.style.zIndex = "1";
    countdown.style.fontSize = "4vw";
    countdown.style.fontWeight = "Bold";
    countdown.style.fontFamily = "sans-serif";
    countdown.style.color = "white";
}

function initCSS() {
    const current = new Date();
    let currentHour = current.getHours();
    if (currentHour < 6 || currentHour > 20) {
        document.body.style.background = 'url(nightdefault.jpg)';
    } else if (currentHour == 20) {
        document.body.style.background = 'url(sunsetdefault.jpg)';   
    } else if (currentHour == 6) {
        document.body.style.background = 'url(sunrisedefault.jpg)';   
    } else {
        document.body.style.background = 'url(daydefault.jpg)';   
    }
    CSSparams();
}

/// BACKGROUND ///

const apiURL = 'https://api.unsplash.com/photos/random/?';
const key = 'client_id=dFQhMm9P7hbHbI6SD5lTBTh4N8QPOG3OsHK7CUXxxQc';
const query = "&query=";
let theme = "";
const format = "&orientation=landscape";
let urlRequest = apiURL+key+query+theme+format;
let myPhoto;
let themeList = ["work","trees","sky","rainbow", "moon","water","landscape","office","library","mountain"];

function setRandomTheme () {
    randomNumber = Math.round(Math.random()*10);
    console.log("randomNumber = "+randomNumber);
    theme = themeList[randomNumber];
    urlRequest = apiURL+key+query+theme+format;
    fetch(urlRequest).then(function(response) {
        if(response.ok) {
        response.json().then(function(json) {
            myPhoto = json;
            document.body.style.background = 'url('+myPhoto.urls.raw+'&w=1920)';
            CSSparams();
        });
        } 
        
        else {
            console.log('Network request for getRandomPhoto failed with response ' + response.status + ': ' + response.statusText);
        }
    });
}

function setUserTheme () {
    theme = document.getElementById('img-theme').value;
    urlRequest = apiURL+key+query+theme+format;
    fetch(urlRequest).then(function(response) {
        
        if(response.ok) {
        response.json().then(function(json) {
            myPhoto = json;
            document.body.style.background = 'url('+myPhoto.urls.raw+'&w=1920)';
            CSSparams();
        });
        } 
        
        else {
            console.log('Network request for getRandomPhoto failed with response ' + response.status + ': ' + response.statusText);
        }
    });
}

/// TIMER ///

let startingMinutes;
let startingSeconds;
let time;
let started;

function startCountdown() {

    const pauseBtn = document.getElementById("pauseBtn");
    const playBtn = document.getElementById("playBtn");
    
    started = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    pauseBtn.disabled = false;
    playBtn.disabled = true;

    let minutes = Math.floor(time/60); // on divise les secondes par 60 pour avoir les minutes // Math.floor arrondi le résultat à l'entier inférieur
    let seconds = time % 60; // les secondes restantes après la division des minutes

    if (seconds < 10) {
        seconds = '0'+seconds;
    }
    countdown.innerHTML = minutes+":"+seconds;

    time--;
    console.log(time);
}

function pauseCountdown() {
    pauseBtn.disabled = true;
    playBtn.disabled = false;

    clearInterval(started);
}

function resetCountdown() {
    pauseBtn.disabled = false;
    playBtn.disabled = false;
    clearInterval(started);
    time = startingMinutes * 60 + parseInt(startingSeconds,10);
    countdown.innerHTML = startingMinutes+":"+startingSeconds.toString();
}

function getUserValues() {
    startingMinutes = document.getElementById("minutes").value;
    startingSeconds = document.getElementById("seconds").value;
    countdown.innerHTML = startingMinutes+":"+startingSeconds;
    time = startingMinutes * 60 + parseInt(startingSeconds);//pour transformer les minutes en secondes
}

/*
/// TIMER ///

let startingMinutes = 20;
let startingSeconds = "00";
let time = startingMinutes * 60 + parseInt(startingSeconds,10); //pour transformer les minutes en secondes

let started;

function startCountdown() {
    const pauseBtn = document.getElementById("pauseBtn");
    const playBtn = document.getElementById("playBtn");
    
    started = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    pauseBtn.disabled = false;
    playBtn.disabled = true;

    const minutes = Math.floor(time/60); // on divise les secondes par 60 pour avoir les minutes // Math.floor arrondi le résultat à l'entier inférieur
    let seconds = time % 60; // les secondes restantes après la division des minutes

    if (seconds < 10) {
        seconds = '0'+seconds;
    }
    countdown.innerHTML = minutes+":"+seconds;
    time--;
}

function pauseCountdown() {
    pauseBtn.disabled = true;
    playBtn.disabled = false;

    clearInterval(started);
}

function resetCountdown() {
    pauseBtn.disabled = false;
    playBtn.disabled = false;
    clearInterval(started);
    time = startingMinutes * 60 + parseInt(startingSeconds,10);
    countdown.innerHTML = startingMinutes+":"+startingSeconds.toString();
}
*/
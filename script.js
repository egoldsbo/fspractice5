var currentdirectory = "mostcommonsigns";
var currentwordset = [];
var wordsetindex = 0;

let originalPlaybackRate = 1;
var speeds = [.12, .25, .5, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3];
var speedIndex = 3;
var videoName = "something";

// Managing two video elements
const videoElements = [document.getElementById("videoPlayer1"), document.getElementById("videoPlayer2")];
let activeVideoIndex = 0; // Index to track which video is currently playing

// Initialize the first video element
videoElements[0].src = generateVideoPath();
videoElements[0].playbackRate = speeds[speedIndex];
videoElements[0].play();

// Button to reveal the video name
const buttonElement = document.getElementById("revealword");

buttonElement.onmousedown = () => {
    buttonElement.textContent = videoName;
};

buttonElement.ontouchstart = () => {
    buttonElement.textContent = videoName;
};

buttonElement.onmouseup = () => {
    buttonElement.textContent = "REVEAL FILE NAME";
};

function generateVideoPath() {
    if (currentwordset.length === 0) {
        currentwordset = mostcommonsigns;
    }

    wordsetindex++;
    if (wordsetindex >= currentwordset.length) {
        wordsetindex = 0;
        shuffleArray(currentwordset);
    }

    var playdirectory = "vids/" + currentdirectory + "/" + currentwordset[wordsetindex];
    console.log(playdirectory);
    videoName = playdirectory.split("/").pop();
    return playdirectory;
}

function switchVideos() {
    // Calculate next video index
    let nextVideoIndex = (activeVideoIndex + 1) % videoElements.length;

    // Update video source and prepare next video
    videoElements[nextVideoIndex].src = generateVideoPath();
    videoElements[nextVideoIndex].playbackRate = speeds[speedIndex];
    videoElements[nextVideoIndex].style.display = "block";

    // Hide the current video and show the next one
    videoElements[activeVideoIndex].style.display = "none";
    videoElements[nextVideoIndex].play();
    
    // Swap active video index
    activeVideoIndex = nextVideoIndex;
}

function changeWordset() {
    wordsetindex = 0;
    const dir = document.getElementById("dirSelect").value;
    currentdirectory = dir;

    if (dir === "mostcommonsigns") {
        currentwordset = mostcommonsigns;
    } else if (dir === "mostcommonsigns2") {
        currentwordset = mostcommonsigns2;
    } else if (dir === "dailymoth") {
        currentwordset = dailymoth;
    } else if (dir === "inthewild") {
        currentwordset = inthewild;
    }

else if (dir === "commonwordendings") {
    currentwordset = commonwordendings;
}

    shuffleArray(currentwordset);
    switchVideos(); // Automatically load and play the first video from the new wordset
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function playAgain() {
    const video = videoElements[activeVideoIndex];
    video.style.display = "block";
    video.playbackRate = speeds[speedIndex];
    video.currentTime = 0;
    video.play();
}

function playSlower() {
    const video = videoElements[activeVideoIndex];
    video.style.display = "block";
    video.playbackRate = 0.5;
    video.currentTime = 0;
    video.play();
}

function openInNewTab(urlBase) {
    const videoPath = videoElements[activeVideoIndex].src;
    const videoName = videoPath.split("/").pop();
    const choppedName = videoName.slice(0, -4); // Remove last 4 chars (.mp4)
    window.open(urlBase + choppedName, '_blank');
    
}

function changeSpeed(isIncrease) {
    const video = videoElements[activeVideoIndex];
    if (isIncrease && speedIndex < speeds.length - 1) {
        speedIndex++;
    } else if (!isIncrease && speedIndex > 0) {
        speedIndex--;
    }

    video.playbackRate = speeds[speedIndex];
    document.getElementById("currentSpeed").textContent = video.playbackRate.toFixed(2) + 'x';
}

function aboutSite() {
    const aboutInfo = document.getElementById("aboutInfo");
    if (videoElements[activeVideoIndex].style.display === "block") {
        videoElements[activeVideoIndex].style.display = "none";
        aboutInfo.style.display = "block";
    } else {
        videoElements[activeVideoIndex].style.display = "block";
        aboutInfo.style.display = "none";
    }
}

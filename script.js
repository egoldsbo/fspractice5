

 var currentdirectory="mostcommonsigns";
 var currentwordset=[];
 var wordsetindex=0;

let originalPlaybackRate = 1;
var speeds = [.12, .25, .5, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3];
var speedIndex= 3;
var videoName="something";
const videoElement = document.getElementById("videoPlayer");
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

        function fetchRandomVideo() {
            
                    wordsetindex++;
                    if(wordsetindex>currentwordset.length){
                        wordsetindex=0;

                    }

                    const videoElement = document.getElementById("videoPlayer");
             
                    videoElement.style.display = "block";
                    videoElement.src = currentdirectory+"/"+currentwordset[wordsetindex];
                    const videoPath = videoElement.src;
                    videoName = videoPath.split("/").pop();
                    videoElement.playbackRate = speeds[speedIndex];
                    videoElement.play();
                }
        


        function changeWordset(){
            wordsetindex=0;
            const dir = document.getElementById("dirSelect").value;
            currentdirectory=dir;
                if(dir=="mostcommonsigns"){
                        currentwordset=mostcommonsigns;
                }
                if(dir=="mostcommonsigns2"){
                        currentwordset=mostcommonsigns2;
                }
                if(dir=="dailymoth"){
                        currentwordset=dailymoth;
                }
                if(dir=="inthewild"){
                        currentwordset=inthewild;
                }
                shuffleArray(currentwordset);
        }

    function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


        function playAgain() {
            const video = document.getElementById("videoPlayer");
            video.style.display = "block";
            video.playbackRate = speeds[speedIndex];
            video.currentTime = 0;
            video.play();
        }

        function playSlower() {
            const video = document.getElementById("videoPlayer");
            video.style.display = "block";
            video.playbackRate = 0.5;
            video.currentTime = 0;
            video.play();
        }

        function openInNewTab(urlBase) {
            const videoElement = document.getElementById("videoPlayer");
            const videoPath = videoElement.src;
            const videoName = videoPath.split("/").pop();
            const choppedName = videoName.slice(0, -4); // Remove last 4 chars (.mp4)
            window.open(urlBase + choppedName, '_blank');
        }

        function changeSpeed(isIncrease) {
            const video = document.getElementById("videoPlayer");
            if(isIncrease&&speedIndex<speeds.length-1){
                speedIndex++;
            }

            if (!isIncrease&&speedIndex>0){
            speedIndex--;
        }

            video.playbackRate = speeds[speedIndex];

            document.getElementById("currentSpeed").textContent = video.playbackRate.toFixed(2) + 'x';
        }

        

        function aboutSite() {
            const video = document.getElementById("videoPlayer");
            const aboutInfo = document.getElementById("aboutInfo");
            if( video.style.display == "block"){
                video.style.display = "none";
                aboutInfo.style.display = "block";
        }

        else{video.style.display = "block";
      }

        }
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

function changeIcon() {
  if (video.paused) {
    // add play to button
    play.innerHTML = '<i class = "fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class = "fa fa-pause fa-2x"></i>';
  }
}

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
}

// to take to a particular part in a video
function setProgressVideo() {
  video.currentTime = (+progress.value * video.duration) / 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  timestamp.innerHTML = `${mins}:${secs}`;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}
// Event listeners
// on play pause and viceversa
video.addEventListener("click", toggleVideoStatus);

// change play and pause icon
video.addEventListener("pause", changeIcon);
video.addEventListener("play", changeIcon);
video.addEventListener("timeupdate", updateProgress);
stop.addEventListener("click", stopVideo);
// progress through the video
play.addEventListener("click", toggleVideoStatus);
progress.addEventListener("change", setProgressVideo);

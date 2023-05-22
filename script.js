const player = document.querySelector(".player"),
  videoElement = document.querySelector("video"),
  progressRange = document.querySelector(".progress-range"),
  progressBar = document.querySelector(".progress-bar"),
  playBtn = document.getElementById("play-btn"),
  volumeIcon = document.getElementById("volume-icon"),
  volumeRange = document.querySelector(".volume-range"),
  volumeBar = document.querySelector(".volume-bar"),
  currentTime = document.querySelector(".time-elapsed"),
  duration = document.querySelector(".time-duration"),
  fullScreenBtn = document.querySelector(".fullscreen"),
  speed = document.querySelector(".player-speed");

// Play & Pause ----------------------------------- //

function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

let lastVolume = 1;

// Volume Bar
function changeVolume(event) {
  let volume = event.offsetX / volumeRange.offsetWidth;
  //  Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  videoElement.volume = volume;
  console.log(volume);
  //   Change icon depending on volume
  volumeIcon.className = "";
  if (volume >= 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
  lastVolume = volume;
}

// Mute/Unmute
function toggleMute() {
  volumeIcon.className = "";
  if (videoElement.volume) {
    lastVolume = videoElement.volume;
    videoElement.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    videoElement.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add("fas", "fa-volume-up");
    volumeIcon.setAttribute("title", "Mute");
  }
}

function togglePlayPause() {
  if (videoElement.paused) {
    videoElement.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    videoElement.pause();
    showPlayIcon();
  }
}

// Calculate Display time format
function displayTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${minutes}:${seconds}`;
}

// Progress Bar ---------------------------------- //

// Update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${
    (videoElement.currentTime / videoElement.duration) * 100
  }%`;
  currentTime.textContent = `${displayTime(videoElement.currentTime)} /`;
  duration.textContent = `${displayTime(videoElement.duration)}`;
}

// Click to seek within the video
function setProgress(event) {
  const newTime = event.offsetX / progressRange.offsetWidth;
  progressBar.style.width = newTime * 100 + "%";
  videoElement.currentTime = newTime * videoElement.duration;
}

// On Video End, show play btn icon
videoElement.addEventListener("ended", showPlayIcon);

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //
function changeSpeed() {
  console.log("video playback rate", videoElement.playbackRate);
  console.log(speed.value);
  videoElement.playbackRate = speed.value;
  console.log(videoElement.playbackRate);
}

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  videoElement.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  videoElement.classList.remove("video-fullscreen");
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullScreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

// Event Listeners
playBtn.addEventListener("click", togglePlayPause);
videoElement.addEventListener("click", togglePlayPause);
videoElement.addEventListener("timeupdate", updateProgress);
videoElement.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullScreenBtn.addEventListener("click", toggleFullScreen);

const trackList = document.querySelector(".carousel__tracks");
const tracks = Array.from(trackList.children);
const prevBtn = document.querySelector(".carousel__button--left");
const nextBtn = document.querySelector(".carousel__button--right");
const carouselRadios = document.querySelectorAll(".carousel__nav input");
let trackWidth = tracks[0].getBoundingClientRect().width;

// Window resize, recalculate track position
function recalculateTrackPosition(e) {
  trackWidth = tracks[0].getBoundingClientRect().width;
  tracks.forEach(setTrackPosition);
}

window.addEventListener("resize", function (e) {
  clearTimeout(this.timeout);
  this.timeout = setTimeout(recalculateTrackPosition, 500, e);
});

// Set track position
function setTrackPosition(track, index) {
  track.style.left = trackWidth * index + "px";
}
tracks.forEach(setTrackPosition);

// Slide track
function trackSlide(currentTrack, targetSlide) {
  trackList.style.transform = `translateX(-${targetSlide.style.left})`;
  currentTrack.classList.remove("current-track");
  targetSlide.classList.add("current-track");
  const targetSlideIndex = targetSlide.dataset.index;
  carouselRadios[targetSlideIndex].checked = true;
}

// Slide to previous track
function slideToPrevTrack(event) {
  const currentTrack = trackList.querySelector(".current-track");
  let prevTrack = currentTrack.previousElementSibling;
  if (!prevTrack) prevTrack = tracks[tracks.length - 1];

  trackSlide(currentTrack, prevTrack);
}
prevBtn.addEventListener("click", slideToPrevTrack);

// Slide to next track
function slideToNextTrack(event) {
  const currentTrack = trackList.querySelector(".current-track");
  let nextTrack = currentTrack.nextElementSibling;
  if (!nextTrack) nextTrack = tracks[0];

  trackSlide(currentTrack, nextTrack);
}
nextBtn.addEventListener("click", slideToNextTrack);

// Slide to selected track
function slideToSelectedTrack(event) {
  const currentTrack = trackList.querySelector(".current-track");
  const nextTrack = tracks[event.target.dataset.index];

  trackSlide(currentTrack, nextTrack);
}
carouselRadios.forEach((radio) =>
  radio.addEventListener("change", slideToSelectedTrack)
);

// Handle auto track slide
function handleAutoSlide() {
  const currentTrack = trackList.querySelector(".current-track");
  let nextTrack = currentTrack.nextElementSibling;
  if (!nextTrack) nextTrack = tracks[0];

  trackSlide(currentTrack, nextTrack);
}
setInterval(handleAutoSlide, 5000);

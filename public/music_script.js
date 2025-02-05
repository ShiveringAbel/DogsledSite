let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let playlist = document.querySelector(".playlist");
let liArray = [];
let liNodeArray = [];
let playlist_name = "DOGSLED";

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let wk_cover = "/images/playlist_wk.jpg";
let betty_cover = "/images/playlist_betty.jpg"

let placeholder = [
  {
    name: "Do You Love Me",
    artist: "Nick Cave & The Bad Seeds",
    image: wk_cover,
    path: "/music/Nick Cane & The Bad Seeds/Let Love In/01 - Nick Cave & The Bad Seeds - Do You Love Me.mp3"
  },
  {
    name: "Nobody's Baby Now",
    artist: "Nick Cave & The Bad Seeds",
    image: wk_cover,
    path: "/music/Nick Cane & The Bad Seeds/Let Love In/02 - Nick Cave & The Bad Seeds - Nobody's Baby Now.mp3"
  },
  {
    name: "Loverman",
    artist: "Nick Cave & The Bad Seeds",
    image: wk_cover,
    path: "/music/Nick Cane & The Bad Seeds/Let Love In/03 - Nick Cave & The Bad Seeds - Loverman.mp3",
  },
  {
    name: "Jangling Jack",
    artist: "Nick Cave & The Bad Seeds",
    image: wk_cover,
    path: "music/Nick Cane & The Bad Seeds/Let Love In/04 - Nick Cave & The Bad Seeds - Jangling Jack.mp3",
  },
  {
    name: "Red Right Hand",
    artist: "Nick Cave & The Bad Seeds",
    image: wk_cover,
    path: "music/Nick Cane & The Bad Seeds/Let Love In/05 - Nick Cave & The Bad Seeds - Red Right Hand.mp3",
  },
  {
    name: "I let Love In",
    artist: "Nick Cave & The Bad Seeds",
    image: wk_cover,
    path: "music/Nick Cane & The Bad Seeds/Let Love In/06 - Nick Cave & The Bad Seeds - I Let Love In.mp3",
  },
  {
    name: "Thirsty Dog",
    artist: "Nick Cave & The Bad Seeds",
    image: wk_cover,
    path: "music/Nick Cane & The Bad Seeds/Let Love In/07 - Nick Cave & The Bad Seeds - Thirsty Dog.mp3",
  },
  {
    name: "Ain't Gonna Rain Anymore",
    artist: "Nick Cave & The Bad Seeds",
    image: wk_cover,
    path: "music/Nick Cane & The Bad Seeds/Let Love In/08 - Nick Cave & The Bad Seeds - Ain't Gonna Rain Anymore.mp3",
  },
  {
    name: "Lay Me Low",
    artist: "Nick Cave & The Bad Seeds",
    image: wk_cover,
    path: "music/Nick Cane & The Bad Seeds/Let Love In/09 - Nick Cave & The Bad Seeds - Lay Me Low.mp3",
  },
  {
    name: "Do You Love Me Part 2",
    artist: "Nick Cave & The Bad Seeds",
    image: wk_cover,
    path: "music/Nick Cane & The Bad Seeds/Let Love In/10 - Nick Cave & The Bad Seeds - Do You Love Me Part 2.mp3",
  },
];

let track_list = placeholder

//playlist stuff
let dogs = document.getElementById("Dogsled")
let enkr = document.getElementById("ENKRATEIA")
let coma = document.getElementById("COMA")

dogs.onclick = function() {
  playlist_name = "DOGSLED";
  track_list = placeholder
  loadTrack(0);
}
enkr.onclick = function() {
  playlist_name = "ENKRATEIA"
  track_list = placeholder
  loadTrack(0);
}
coma.onclick = function() {
  playlist_name = "COMA"
  track_list = placeholder
  loadTrack(0);
}
//playlist stuff

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + playlist_name + ": " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  //random_bg_color();

  updatePlaylist();
}

function loadPlaylist() {
  for (let i = 0; i < track_list.length; i++) {
    liArray[i] = document.createElement("li");
    playlist.appendChild(liArray[i]);
    liNodeArray[i] = document.createTextNode(track_list[i].name + " - " + track_list[i].artist);
    liArray[i].appendChild(liNodeArray[i]);

    liArray[i].onclick = function() {
      track_index = i;
      loadTrack(track_index);
    }
  }
}

function updatePlaylist() {
  for (let i = 0; i < track_list.length; i++) {
    if (i == track_index) {
      liArray[i].style.setProperty("font-weight", "bolder")
    } else {
      liArray[i].style.setProperty("font-weight", "normal")
    }
  }
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadPlaylist();
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}



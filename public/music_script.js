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
let track_list;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let wk_cover = "/images/playlist_wk.jpg";
let betty_cover = "/images/playlist_betty.jpg"
let full_cover ="images/playlist_full.jpg"


window.addEventListener("beforeunload", function() {
  sessionStorage.setItem("playlist_name", playlist_name)
  sessionStorage.setItem("track_index", track_index)
  sessionStorage.setItem("current_time", curr_track.currentTime)
  sessionStorage.setItem("current_vol", curr_track.volume)
  console.log("unloading playlist: " + playlist_name)
  console.log("unloading track: " + track_index)
  console.log("unloading track time: " + curr_track.currentTime)
  console.log("unloading track vol: " + curr_track.volume)
})


let sessionPlaylist = sessionStorage.getItem("playlist_name")
let sessionTrack = sessionStorage.getItem("track_index")
let sessionTime = sessionStorage.getItem("current_time")
let sessionVol = sessionStorage.getItem("current_vol")

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

//easily switch out cover art
let dogsled_cover = full_cover;

let DOGSLED = [
  {
    name: "Wallflower",
    artist: "Switchblade Symphony",
    image: dogsled_cover,
    path: "music/dogsled/Switchblade Symphony - Wallflower.mp3"
  },
  {
    name: "Do You Love Me?",
    artist: "Nick Cave & The Bad Seeds",
    image: dogsled_cover,
    path: "music/dogsled/Nick Cave and the Bad Seeds - Do You Love Me.mp3"
  },
  {
    name: "Brackish",
    artist: "Kittie",
    image: dogsled_cover,
    path: "music/dogsled/Kittie - Brackish.mp3"
  },
  {
    name: "Change (In the House of Flies)",
    artist: "Deftones",
    image: dogsled_cover,
    path: "music/dogsled/Deftones - Change (In the House of Flies).mp3"
  },
  {
    name: "The Noose",
    artist: "A Perfect Circle",
    image: dogsled_cover,
    path: "music/dogsled/A Perfect Circle - The Noose.mp3"
  },
  {
    name: "Broken Record",
    artist: "Scarling.",
    image: dogsled_cover,
    path: "music/dogsled/Scarling. - Broken Record.mp3"
  },
  {
    name: "Our Ride to the Rectory",
    artist: "Team Sleep",
    image: dogsled_cover,
    path: "music/dogsled/Team Sleep - Our Ride to the Rectory.mp3"
  },
  {
    name: "My Iron Lung",
    artist: "Radiohead",
    image: dogsled_cover,
    path: "music/dogsled/Radiohead - My Iron Lung.mp3"
  },
  {
    name: "Something I Can Never Have",
    artist: "Nine Inch Nails",
    image: dogsled_cover,
    path: "music/dogsled/Nine Inch Nails - Something I Can Never Have.mp3"
  },
  {
    name: "Paperdoll",
    artist: "Kittie",
    image: dogsled_cover,
    path: "music/dogsled/Kittie - Paperdoll.mp3"
  },
  {
    name: "Bloody Murderer",
    artist: "Cursive",
    image: dogsled_cover,
    path: "music/dogsled/Cursive - Bloody Murderer.mp3"
  },
  {
    name: "White Shadow Waltz",
    artist: "Okkervil River",
    image: dogsled_cover,
    path: "music/dogsled/Okkervil River - White Shadow Waltz.mp3"
  },
  {
    name: "Blue",
    artist: "A Perfect Circle",
    image: dogsled_cover,
    path: "music/dogsled/A Perfect Circle - Blue.mp3"
  },
  {
    name: "Anniversary of an Uninteresting Event",
    artist: "Deftones",
    image: dogsled_cover,
    path: "music/dogsled/Deftones - Anniversary of an Uninteresting Event.mp3"
  },
  {
    name: "Border Factory",
    artist: "Xiu Xiu",
    image: dogsled_cover,
    path: "music/dogsled/Xiu Xiu - Border Factory.mp3"
  },
  {
    name: "Dracula Parrot, Moon Moth",
    artist: "Xiu Xiu",
    image: dogsled_cover,
    path: "music/dogsled/Xiu Xiu - Dracula Parrot, Moon Moth.mp3"
  },
  {
    name: "Forever Night Castle of Love",
    artist: "Kekht Arakh",
    image: dogsled_cover,
    path: "music/dogsled/Këkht Aräkh - Forever Night Castle of Love.mp3"
  },
  {
    name: "Palace",
    artist: "The Antlers",
    image: dogsled_cover,
    path: "music/dogsled/The Antlers - Palace.mp3"
  },
  {
    name: "Another Version Of The Truth",
    artist: "Nine Inch Nails",
    image: dogsled_cover,
    path: "music/dogsled/Nine Inch Nails - Another Version Of The Truth.mp3"
  },
  {
    name: "And No More Shall We Part",
    artist: "Nick Cave & The Bad Seeds",
    image: dogsled_cover,
    path: "music/dogsled/Nick Cave & the Bad Seeds - And No More Shall We Part.mp3"
  },
  {
    name: "Drowning Lessons",
    artist: "My Chemical Romance",
    image: dogsled_cover,
    path: "music/dogsled/My Chemical Romance - Drowning Lessons.mp3"
  },
]

//playlist stuff
let dogs = document.getElementById("Dogsled")
let enkr = document.getElementById("ENKRATEIA")
let coma = document.getElementById("COMA")

function setPlaylist(list_name) {
  playlist_name = list_name;
  if (list_name == "DOGSLED") {
    track_list = DOGSLED;
    loadPlaylist();
  } else {
    track_list = placeholder;
    loadPlaylist();
  }
  track_index = 0;
  loadTrack(track_index);
}

dogs.onclick = function() {
  setPlaylist("DOGSLED");
}
enkr.onclick = function() {
  setPlaylist("ENRATEIA");
}
coma.onclick = function() {
  setPlaylist("COMA");
}
//playlist stuff

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

function resetPlaylist() {
  for (let i = 0; i < liArray.length; i++) {
    liNodeArray[i].remove();
    liArray[i].remove();
  }
}

function loadPlaylist() {
  resetPlaylist();
  for (let i = 0; i < track_list.length; i++) {
    liArray[i] = document.createElement("li");
    playlist.appendChild(liArray[i]);
    liNodeArray[i] = document.createTextNode(track_list[i].name + " - " + track_list[i].artist);
    liArray[i].appendChild(liNodeArray[i]);

    liArray[i].onclick = function() {
      track_index = i;
      loadTrack(track_index);
      playTrack();
    }
  }
  updatePlaylist();
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

function loadSession() {
  setPlaylist(sessionPlaylist);
  loadPlaylist();
  track_index = Number(sessionTrack);
  loadTrack(track_index);
  curr_track.currentTime = sessionTime
  curr_track.volume = sessionVol
  volume_slider.value = sessionVol * 100;
  playTrack();
}

// Load the first track in the tracklist

track_list = DOGSLED;
if (sessionTrack !== null){
  console.log("loading playlist: " + sessionPlaylist)
  console.log("loading track: " + sessionTrack)
  console.log("loading track time: " + sessionTime)
  console.log("loading track vol: " + sessionVol)
  loadSession();
} else {
  setPlaylist("DOGSLED");
  loadPlaylist();
  loadTrack(0);
}

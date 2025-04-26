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

let enkrateia_cover = wk_cover

let ENKRATEIA = [
  {
    name: "Avbrott Sex",
    artist: "Lifelover",
    image: enkrateia_cover,
    path: "music/Enkrateia/Lifelover - Avbrott Sex.mp3"
  },
  {
    name: "One Hundred Years",
    artist: "Xiu Xiu",
    image: enkrateia_cover,
    path: "music/Enkrateia/Xiu Xiu - One Hundred Years (with Chelsea Wolfe).mp3"
  },
  {
    name: "Meds",
    artist: "Placebo",
    image: enkrateia_cover,
    path: "music/Enkrateia/Placebo - Meds (Feat.Alison Mosshart).mp3"
  },
  {
    name: "Wild Wind",
    artist: "VOWWS",
    image: enkrateia_cover,
    path: "music/Enkrateia/VOWWS - Wild Wind.mp3"
  },
  {
    name: "No One",
    artist: "Joydrop",
    image: enkrateia_cover,
    path: "music/Enkrateia/Joydrop - No One.mp3"
  },
  {
    name: "God Is a Circle",
    artist: "Yves Tumor",
    image: enkrateia_cover,
    path: "music/Enkrateia/Yves Tumor - God Is a Circle.mp3"
  },
  {
    name: "Good Boy",
    artist: "Patriarchy",
    image: enkrateia_cover,
    path: "music/Enkrateia/Patriarchy - Good Boy.mp3"
  },
  {
    name: "Fantasy World",
    artist: "Feline",
    image: enkrateia_cover,
    path: "music/Enkrateia/Feline - Fantasy World.mp3"
  },
  {
    name: "Moral Centralia",
    artist: "Harvey Danger",
    image: enkrateia_cover,
    path: "music/Enkrateia/Harvey Danger - Moral Centralia.mp3"
  },
  {
    name: "Young Eucharists",
    artist: "Parenthetical Girls",
    image: enkrateia_cover,
    path: "music/Enkrateia/Parenthetical Girls - Young Eucharists.mp3"
  },
  {
    name: "Blind",
    artist: "Placebo",
    image: enkrateia_cover,
    path: "music/Enkrateia/Placebo - Blind.mp3"
  },
  {
    name: "Just You And Me",
    artist: "The Birthday Party",
    image: enkrateia_cover,
    path: "music/Enkrateia/The Birthday Party - Just You And Me.mp3"
  },
  {
    name: "F.t.w.",
    artist: "Xiu Xiu",
    image: enkrateia_cover,
    path: "music/Enkrateia/Xiu Xiu - F.T.W..mp3"
  },
  {
    name: "Cold",
    artist: "The Cure",
    image: enkrateia_cover,
    path: "music/Enkrateia/The Cure - Cold.mp3"
  },
  {
    name: "The Crawl",
    artist: "Placebo",
    image: enkrateia_cover,
    path: "music/Enkrateia/Placebo - The Crawl.mp3"
  },
  {
    name: "All is Full Of Love",
    artist: "Björk",
    image: enkrateia_cover,
    path: "music/Enkrateia/Björk - All Is Full Of Love.mp3"
  },
  {
    name: "Rope On FIre",
    artist: "Morphine",
    image: enkrateia_cover,
    path: "music/Enkrateia/Morphine - Rope On Fire.mp3"
  },
  {
    name: "Thorns",
    artist: "Këkht Aräkh",
    image: enkrateia_cover,
    path: "music/Enkrateia/Këkht Aräkh - Thorns.mp3"
  },
  {
    name: "Bright Dead Star",
    artist: "Current 93",
    image: enkrateia_cover,
    path: "music/Enkrateia/Current 93 - Bright Dead Star.mp3"
  },
  {
    name: "From Her to Eternity",
    artist: "Nick Cave & The Bad Seeds",
    image: enkrateia_cover,
    path: "music/Enkrateia/Nick Cave and the Bad Seeds - From Her to Eternity (1987) (Bonus track).mp3"
  },
  {
    name: "Killing for Company",
    artist: "Swans",
    image: enkrateia_cover,
    path: "music/Enkrateia/Swans - Killing for Company.mp3"
  },
  {
    name: "It's Your Life",
    artist: "Milla Jovovich",
    image: enkrateia_cover,
    path: "music/Enkrateia/Milla Jovovich - It's Your Life.mp3"
  },
  {
    name: "Fan Letter",
    artist: "Michael Gira",
    image: enkrateia_cover,
    path: "music/Enkrateia/Michael Gira - Fan Letter.mp3"
  },
  {
    name: "Malpractice",
    artist: "Faith No More",
    image: enkrateia_cover,
    path: "music/Enkrateia/Faith No More - Malpractice.mp3"
  },
  {
    name: "Starry Stairs",
    artist: "Okkervil River",
    image: enkrateia_cover,
    path: "music/Enkrateia/Okkervil River - Starry Stairs.mp3"
  },
  {
    name: "Hope In Suffering",
    artist: "Yves Tumor",
    image: enkrateia_cover,
    path: "music/Enkrateia/Yves Tumor - Hope In Suffering (Escaping Oblivion & Overcoming Powerlessness) (feat. Oxhy & Puce Mary).mp3"
  },
  {
    name: "Love",
    artist: "Këkht Aräkh",
    image: enkrateia_cover,
    path: "music/Enkrateia/Këkht Aräkh - Love.mp3"
  },
  {
    name: "Starblood",
    artist: "Cranes",
    image: enkrateia_cover,
    path: "music/Enkrateia/Cranes - Starblood.mp3"
  },
  {
    name: "The Teeth of the Winds of the Sea",
    artist: "Current 93",
    image: enkrateia_cover,
    path: "music/Enkrateia/Current 93 - The Teeth Of The Winds Of The Sea.mp3"
  },
  {
    name: "Second Face",
    artist: "Saâda Bonaire",
    image: enkrateia_cover,
    path: "music/Enkrateia/Saâda Bonaire - Second Face.mp3"
  },
  {
    name: "Spark",
    artist: "Tori Amos",
    image: enkrateia_cover,
    path: "music/Enkrateia/Tori Amos - Spark.mp3"
  },
  {
    name: "Just the Same But Brand New",
    artist: "St. Vincent",
    image: enkrateia_cover,
    path: "music/Enkrateia/St. Vincent - Just the Same but Brand New.mp3"
  },
  {
    name: "Messiah Ward",
    artist: "Nick Cave & The Bad Seeds",
    image: enkrateia_cover,
    path: "music/Enkrateia/Nick Cave and the Bad Seeds - Messiah Ward.mp3"
  },
  {
    name: "Piña, Coconut & Cherry",
    artist: "Xiu Xiu",
    image: enkrateia_cover,
    path: "music/Enkrateia/Xiu Xiu - Piña, Coconut & Cherry.mp3"
  },
  {
    name: "This Regrettable End",
    artist: "Parenthetical Girls",
    image: enkrateia_cover,
    path: "music/Enkrateia/Parenthetical Girls - This regrettable end.mp3"
  },
  {
    name: "Black Lake",
    artist: "Björk",
    image: enkrateia_cover,
    path: "music/Enkrateia/Björk - Black Lake.mp3"
  }
]

let coma_cover = betty_cover

let COMA = [
  {
    name: "Waterflower",
    artist: "The Pacific Ocean",
    image: coma_cover,
    path: "music/Coma/The Pacific Ocean - Waterflower.mp3"
  },
  {
    name: "In The Maybe World",
    artist: "Lisa Germano",
    image: coma_cover,
    path: "music/Coma/Lisa Germano - In the Maybe World.mp3"
  },
  {
    name: "Super Falling Star",
    artist: "Stereolab",
    image: coma_cover,
    path: "music/Coma/Stereolab - Super Falling Star.mp3"
  },
  {
    name: "Cold Fish",
    artist: "Queenadreena",
    image: coma_cover,
    path: "music/Coma/QueenAdreena - Cold Fish.mp3"
  },
  {
    name: "Ego Maniac Kid",
    artist: "Blonde Redhead",
    image: coma_cover,
    path: "music/Coma/Blonde Redhead - Ego Maniac Kid.mp3"
  },
  {
    name: "Dancing",
    artist: "Katie Dey",
    image: coma_cover,
    path: "music/Coma/Katie Dey - Dancing.mp3"
  },
  {
    name: "Child I Will Hurt You",
    artist: "Crystal Castles",
    image: coma_cover,
    path: "music/Coma/Crystal Castles - Child I Will Hurt You.mp3"
  },
  {
    name: "Girl Anachronism",
    artist: "The Dresden Dolls",
    image: coma_cover,
    path: "music/Coma/The Dresden Dolls - Girl Anachronism.mp3"
  },
  {
    name: "Wax And Wane - Remixed",
    artist: "Cocteau Twins",
    image: coma_cover,
    path: "music/Coma/Cocteau Twins - Wax And Wane (Remixed).mp3"
  },
  {
    name: "Supervixen",
    artist: "Garbage",
    image: coma_cover,
    path: "music/Coma/Garbage - Supervixen.mp3"
  },
  {
    name: "The Invisible Man",
    artist: "Lush",
    image: coma_cover,
    path: "music/Coma/Lush - The Invisible Man.mp3"
  },
  {
    name: "Dogs In A Cage",
    artist: "Angelfish",
    image: coma_cover,
    path: "music/Coma/Angelfish - Dogs In A Cage.mp3"
  },
  {
    name: "Brena",
    artist: "A Perfect Circle",
    image: coma_cover,
    path: "music/Coma/A Perfect Circle - Breña.mp3"
  },
  {
    name: "Simon's Sleeping",
    artist: "Pretty Balanced",
    image: coma_cover,
    path: "music/Coma/Pretty Balanced - Simon's Sleeping.mp3"
  },
  {
    name: "Hidden Place",
    artist: "Björk",
    image: coma_cover,
    path: "music/Coma/Björk - Hidden Place.mp3"
  },
  {
    name: "Maybae Baeby",
    artist: "Xiu Xiu",
    image: coma_cover,
    path: "music/Coma/Xiu Xiu - Maybae Baeby.mp3"
  },
  {
    name: "Shadow of a Doubt",
    artist: "Sonic Youth",
    image: coma_cover,
    path: "music/Coma/Sonic Youth - Shadow of a Doubt.mp3"
  },
  {
    name: "Girl Lunar Explorer",
    artist: "Melora Creager",
    image: coma_cover,
    path: "music/Coma/Melora Creager - Girl Lunar Explorer.mp3"
  },
  {
    name: "Run Through",
    artist: "Denali",
    image: coma_cover,
    path: "music/Coma/Denali - Run Through.mp3"
  },
  {
    name: "Setting Sun",
    artist: "You'll Never Get to Heaven",
    image: coma_cover,
    path: "music/Coma/You'll Never Get to Heaven - Setting Sun.mp3"
  },
  {
    name: "Desire Lines",
    artist: "Lush",
    image: coma_cover,
    path: "music/Coma/Lush - Desire Lines.mp3"
  },
  {
    name: "Please Don't Leave Me",
    artist: "Uboa",
    image: coma_cover,
    path: "music/Coma/Uboa - Please Don't Leave Me.mp3"
  },
  {
    name: "Under Ice",
    artist: "Kate Bush",
    image: coma_cover,
    path: "music/Coma/Kate Bush - Under Ice.mp3"
  },
  {
    name: "Fuzz Gong Fight",
    artist: "Xiu Xiu",
    image: coma_cover,
    path: "music/Coma/Xiu Xiu - Fuzz Gong Fight.mp3"
  },
  {
    name: "Baby Dracula",
    artist: "Scarling.",
    image: coma_cover,
    path: "music/Coma/Scarling. - Baby Dracula.mp3"
  },
  {
    name: "The Gate",
    artist: "Björk",
    image: coma_cover,
    path: "music/Coma/Björk - The Gate.mp3"
  },
  {
    name: "I Am Made Of Chalk",
    artist: "Crystal Castles",
    image: coma_cover,
    path: "music/Coma/Crystal Castles - I Am Made Of Chalk.mp3"
  },
  {
    name: "The Frail - Remix",
    artist: "Nine Inch Nails",
    image: coma_cover,
    path: "music/Coma/Nine Inch Nails - The Frail (version).mp3"
  },
  {
    name: "Misspent Youth",
    artist: "Uboa",
    image: coma_cover,
    path: "music/Coma/Uboa - Misspent Youth.mp3"
  },
  {
    name: "Mary Of Silence",
    artist: "Mazzy Star",
    image: coma_cover,
    path: "music/Coma/Mazzy Star - Mary of Silence.mp3"
  },
  {
    name: "Phantom Love",
    artist: "Lisa Germano",
    image: coma_cover,
    path: "music/Coma/Lisa Germano - Phantom Love.mp3"
  },
  {
    name: "Joga",
    artist: "Björk",
    image: coma_cover,
    path: "music/Coma/Björk - Joga.mp3"
  },
  {
    name: "The Last Man On Earth",
    artist: "Schoolyard Heroes",
    image: coma_cover,
    path: "music/Coma/Schoolyard Heroes - The Last Man on Earth.mp3"
  },
  {
    name: "Mossbraker",
    artist: "Broken Social Scene",
    image: coma_cover,
    path: "music/Coma/Broken Social Scene - Mossbraker.mp3"
  },
  {
    name: "Ice age",
    artist: "How To Destroy Angels",
    image: coma_cover,
    path: "music/Coma/How to Destroy Angels - Ice Age.mp3"
  },
  {
    name: "Nullaby",
    artist: "Denali",
    image: coma_cover,
    path: "music/Coma/Denali - Nullaby.mp3"
  },
  {
    name: "Lady In The Lake",
    artist: "Elysian Fields",
    image: coma_cover,
    path: "music/Coma/Elysian Fields - Lady In The Lake.mp3"
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
  } else if (list_name == "COMA") {
    track_list = COMA;
    loadPlaylist();
  } else if (list_name == "ENKRATEIA") {
    track_list = ENKRATEIA;
    loadPlaylist();
  }  else {
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
  setPlaylist("ENKRATEIA");
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
  let width = screen.width; 
  if (width <= 800) {
    return; // prevent music from playing when controls are not visible
    // not working ???
  }
  else {
  setPlaylist(sessionPlaylist);
  loadPlaylist();
  track_index = Number(sessionTrack);
  loadTrack(track_index);
  curr_track.currentTime = sessionTime
  curr_track.volume = sessionVol
  volume_slider.value = sessionVol * 100;
  playTrack();}
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

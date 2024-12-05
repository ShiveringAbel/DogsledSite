
/*
TO-DO
- add buttons in menu that allow user to reset chapter progress & all progress
- create a 'continue reading' butotn + function that links to the most recently viewed chapter
*/


//~ * ~ * ~ * ~ variables ~ * ~ * ~ * ~//


// * * variables that represent HTML elements in document
    // data will be read from these elements
const reader = document.getElementById("e-reader");
const jButton = document.getElementById("jump");
const jCheck = document.getElementById("autoJumpCheckB");
const contButton = document.getElementById("pickUpButton");
const resetButton = document.getElementById("resetButton");

    // the innerHTML of these elements will be edited
const progress_display = document.getElementById("progress");
const current_prog = document.getElementById("current-progress");
const jump_display = document.getElementById("jump_debug");
const contReplace = document.getElementById("pickUpSpan");

// * *  variables that store data about the page
const url = window.location.href; 
const current_chapter = whatChapter(url, 5); // grabs chapter number (used for cookie names) * *
console.log(current_chapter)
var reader_height;
var current_scroll;
var currentPercent;

// * * variables that grab static data from localStorage (site cookies)
const cookie_label = ('scrollpos_' + current_chapter);
const scrollpos = localStorage.getItem(cookie_label);
const last_chapter = localStorage.getItem("latestChapter");
const autoJumpToggle = localStorage.getItem("autoJumpToggle");



//~ * ~ * ~ * ~ script ~ * ~ * ~ * ~//


// * * these scripts run automatically when this file is loaded
// * nothing else in the file executes unless it is called by another function

if (last_chapter !== null){ // validates cookie
    var chNum = last_chapter.match(/\d+/)[0] // regex replace extracts number from "ch1" string
    contReplace.innerHTML = chNum // displays last stored chapter
} else {
    contButton.style.display = "none"; // hides button if cookie doesnt exist
}

if (autoJumpToggle !== null){ // validates that cookie exists * *
    jCheck.checked = autoJumpToggle === 'true'; // sets checkbox state to whatever is stored in cookies * *
} else {
    jCheck.checked = true; // if cookie doesnt exist (site has not been visited before) checkbox is automatically enabled * *
}


// * * these functions control all other functions in the file
// * they are called in the header of the HTML doc when the page is loaded to avoid conflicts with other JS files 

    export function scrollJump_main() { // called by inline script in document upon page load * *
        if (jCheck.checked){
            jumpToReading(); // if autojump is enabled; call jump function * *
        }
        updateJumpDisplay(); // updates "last saved position" display * *
    }

export async function importChapterText(){
    let file = ("chapters\\" + current_chapter + "-formatted.txt")
    const response = await fetch (file) // fetches text * *
    .then(x => x.text()) // reads the text * *
    .then(y => document.getElementById("TextGoesHere").innerHTML = y); // replaces e-reader innerHTML w/ chapter text * *
    return Promise.resolve(response); // returns AFTER text is fetched & innerHTML is replaced* *
}


// * * these functions handle the meat of the operation
// * they may be called by multiple different functions

function jumpToReading() {
        reader.scrollTo(0, scrollpos); // sets current e-reader scroll position to last saved position * *
        if (reader.scrollTop == scrollpos) { // update display * *
            jump_display.innerHTML = "successfully jumped to last position!"
            jump_display.title = ""
        }
        else { // update display * *
            jump_display.innerHTML = "failed to jump to last position"
            jump_display.title = "press the 'jump to saved position button' to retry" // adds cool hover text * *
        }
}

function updateJumpDisplay() { // updates 'last saved position' display * *
    reader_height = (reader.scrollHeight - reader.clientHeight); // sutracts visual height of element from total height of text, since scrollTop only checks top of scroll height * *
    var progressPercent = Math.ceil((scrollpos / reader_height) * 100);
    progress_display.innerHTML = (progressPercent + "%");
}

function whatChapter(search_this, numChapters) { // THIS WILL ONLY WORK IF THE URL HAS THE CHAPTER NUMBER IN IT * *
    for (let i = 1; i <= numChapters; i++) {
        var temp_chapter = "ch" + i // loops thru all chapter numbers * *
        if (search_this.search(temp_chapter) != -1) { // searches url for every chapter number * *
            // exits loop when matching chapter is found * *
            return temp_chapter;
        }
    }
}


// * * event listeners: functions that execute when something happens in the page
// * they are not called by any other functions

reader.addEventListener('scroll', function() { // executes when e-reader is scrolled * *
    current_scroll = reader.scrollTop;
    currentPercent = Math.ceil((current_scroll / reader_height) * 100);
    current_prog.innerHTML = (currentPercent + "%");
});

jButton.onclick = function() { // jumps to last saved position when button is clicked
    jumpToReading();
}

contButton.onclick = function() {
    var new_url = url.replace(current_chapter, last_chapter)
    window.location.href = new_url
}

resetButton.onclick = function() {
    const numChapters = 5;
    for (let i = 1; i <= numChapters; i++) {
        var temp_cookie = "scrollpos_ch" + i
        localStorage.removeItem(temp_cookie)
    }
    localStorage.removeItem("latestChapter")
    reader.scrollTo(0, 0);
}

window.onbeforeunload = function(e) { // saves current position & autojump toggle to cookies before leaving page
    localStorage.setItem(cookie_label, reader.scrollTop);
    localStorage.setItem("autoJumpToggle", jCheck.checked);
    localStorage.setItem("latestChapter", current_chapter);
};

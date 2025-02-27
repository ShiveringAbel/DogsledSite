
const crown = document.getElementById("crown");
let crownClasses = crown.classList;
const butterfly = document.getElementById("butterfly");
let bflyClasses = butterfly.classList;
const snow2 = document.getElementById("snow2");
let snow2Classes = snow2.classList;

let crownStatus = localStorage.getItem("crown");

import { letItSnow } from "./snowfall.js";

export function crown_main() {
    if (crownStatus == "worn") {
        wearCrown();
        letItSnow();
    }
} 

crown.onclick = function() {
    wearCrown();
    localStorage.setItem("crown", "worn");
}

function wearCrown() {
    console.log("Wearing Crown")
    crownClasses.replace("visible", "hidden")
    snow2Classes.replace("hidden", "visible")
    letItSnow();
}

snow2.onclick = function() {
    snow2Classes.replace("visible", "hidden")
    bflyClasses.replace("hidden", "visible")
}
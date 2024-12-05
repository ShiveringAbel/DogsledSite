
const crown = document.getElementById("crown");
let crownClasses = crown.classList;
const snow = document.getElementById("snow");
let snowClasses = snow.classList;

let crownStatus = localStorage.getItem("crown");

import { letItSnow } from "./snowfall.js";

export function crown_main() {
    if (crownStatus == "worn") {
        wearCrown();
    }
} 

crown.onclick = function() {
    wearCrown();
    localStorage.setItem("crown", "worn");
}

function wearCrown() {
    console.log("Wearing Crown")
    crownClasses.replace("visible", "hidden")
    snowClasses.replace("hidden", "visible")
    letItSnow()
}
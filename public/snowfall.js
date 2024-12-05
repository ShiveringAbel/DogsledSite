
const numOfSnowflakes = 100; // dynamic snowflake count
const color_array = ['#ffffff', '#e4f2f7', '#c8e5ee', '#add8e6'];
let crownStatus = localStorage.getItem("crown");

/*
window.onload = function() {
    if (crownStatus == "worn")  {
    letItSnow();
    }
}
*/

export function letItSnow() {
    createSnowflakes();
    animateSnowflakes();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function createSnowflakes() {
    let initialSnow = document.getElementById("initial-snow");
    let pArr = [];
    let textArr = [];
    for (let i = 0; i < numOfSnowflakes; i++) {
        pArr[i] = document.createElement("p")
        pArr[i].classList.add("snowflake")
        textArr[i] = document.createTextNode("*")
        // eventually make version w/ gif ?? 
        //https://www.deviantart.com/saezenza/art/Snowflake-Pixel-GIF-703683909
        pArr[i].appendChild(textArr[i])
        initialSnow.appendChild(pArr[i])
    }
}

function animateSnowflakes() {
    const snowflakes = document.getElementsByClassName("snowflake");
    for (let i = 0; i < snowflakes.length; i++) {
        snowflakes[i].classList.replace("hidden", "visible");

        let randomN = (getRandomInt(110) - getRandomInt(110)); // horizontal spacing
        let randomX = (Math.random() * 7.5) // modify randomN using this
        let randomN2 = getRandomInt(100); //left offset
        let randomX2 = ((Math.random() * 3) + 3)
        //console.log(randomX2)

        let temp_color = color_array[getRandomInt(4)] // grab random color from color_array

        snowflakes[i].style.setProperty("font-size", (((randomX2)) + "vh"))
        snowflakes[i].style.setProperty("--left-start", (randomN + "vw")); // starting x position
        if (i % 2 == 0) {// random ending x position
            snowflakes[i].style.setProperty("--left-end", ((randomN - randomX) + "vw"));  // drift left
        } else {snowflakes[i].style.setProperty("--left-end", ((randomN + randomX) + "vw"));} // drift right
        snowflakes[i].style.setProperty("left", (randomN2 + "vw")); // left offset
        snowflakes[i].style.setProperty("animation", "snowfall 10s linear infinite");
        snowflakes[i].style.setProperty("animation-delay", ("-" + (Math.random() * 10 + 1) + "s"))
        snowflakes[i].style.setProperty("color", temp_color)
        if (i < (numOfSnowflakes / 2.5)) { // a few snowflakes for illusion of depth
            snowflakes[i].style.setProperty("color", ('hsl(from ' + temp_color + ' h calc(s / 4) calc(l / 1.25))'))
            snowflakes[i].style.setProperty("filter", ("blur(" + ((Math.random() * 2) + 0.5) + "px)"))
            snowflakes[i].style.setProperty("font-size", (randomX2 - 1.5) + "vh")
        }
        /*
        else if (i < (numOfSnowflakes / 4)) {
            snowflakes[i].style.setProperty("color", "lightblue")
        }
        else if (i < (numOfSnowflakes / 2)) {
            snowflakes[i].style.setProperty("color", "rgb(210, 226, 231)")
        }
            */

    }
}
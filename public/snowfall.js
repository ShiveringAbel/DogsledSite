
/*
snowflake script by shiveringabel on github / monstertsunami on tumblr :)
HOW TO USE: put this snippet in ur html header

    <script type="module" crossorigin src="snowfall.js"></script>
    <link href="snow.css" rel="stylesheet" type="text/css" media="all">
    
    <script type="module">
        import { letItSnow } from "./snowfall.js";
        letItSnow(); //defaults to 100 snowflakes, add a number to the parameter to change amt of snowflakes generated
    </script>

*/


var numOfSnowflakes // dynamic snowflake count
const color_array = ['#ffffff', '#e4f2f7', '#c8e5ee', '#add8e6']; //gradient from white to blue

export function letItSnow(flakeCount = 100) { //100 snowflakes is the default: call the function w/ a number in the parameter to change the # of snowflakes generated
    numOfSnowflakes = flakeCount
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
    for (let i = 0; i < numOfSnowflakes; i++) { //creates a paragraph element with a text node inside for each snowflake
        pArr[i] = document.createElement("p")
        pArr[i].classList.add("snowflake")
        textArr[i] = document.createTextNode("*") //edit the contents of this text node to edit the appearance of the snowflake
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
        if (i < (numOfSnowflakes / 2.5)) { // select a few snowflakes to edit for illusion of depth
            snowflakes[i].style.setProperty("color", ('hsl(from ' + temp_color + ' h calc(s / 4) calc(l / 1.25))')) //darkens color
            snowflakes[i].style.setProperty("filter", ("blur(" + ((Math.random() * 2) + 0.5) + "px)")) //blur
            snowflakes[i].style.setProperty("font-size", (randomX2 - 1.5) + "vh") //shrinks size
        }

    }
}
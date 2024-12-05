const menuButton = document.getElementById("menu")
const modal = document.getElementById("modal")
const closeModal = document.getElementById("close")
const examplePara = document.getElementById("exampleP")
const eReader = document.getElementById("e-reader")
const applyB = document.getElementById("apply")

let storedFontSize = localStorage.getItem("fontSize");

var slider = document.getElementById("fontSlider");
var output = document.getElementById("rangeOutput");
let fontSize = slider.value

if (storedFontSize != "null"){
    fontSize = storedFontSize;
    eReader.style.setProperty("font-size", (fontSize + "%"));
    examplePara.style.setProperty("font-size", (fontSize + "%"))
    slider.value = fontSize;
}

output.innerHTML = (slider.value + "%")

menuButton.onclick = function() {
    modal.style.display = "flex";
}

closeModal.onclick = function() {
    modal.style.display = "none";
  }

slider.oninput = function() {
    fontSize = slider.value;
    output.innerHTML = (fontSize + "%");
    examplePara.style.setProperty("font-size", (fontSize + "%"))
  } 

applyB.onclick = function() {
    eReader.style.setProperty("font-size", (fontSize + "%"))
    localStorage.setItem("fontSize", fontSize)
}
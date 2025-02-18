//recoded 10/11/24 instead of writing an essay<3

var imgSrcHD;
var imgFromList = document.getElementsByTagName("li");
var load;
var currentImg;
var highResModal = document.getElementById("myModal");
var loadingModal = document.getElementById("myModal2");
var closeModal = document.getElementsByClassName("close")[0];
var rightArrow = document.getElementById("right");
var leftArrow = document.getElementById("left");

// replaces modal image with high res image
function fetchHighRes(imgURL, indexHR) {
  sourceReplace(imgURL, indexHR);

  console.log("img url: " + imgURL.src);

  let thumbPath = "galleryscaled/";
  imgSrcHD = imgURL.src.replace(thumbPath, "");
  if (imgURL.id == ".png") {
    imgSrcHD = imgSrcHD.replace("jpg", "png");
  } else if (imgURL.id == ".jpg") {
    imgSrcHD = imgSrcHD.replace("png", "jpg");
  }
  //^ changes the image path
  load = 1;
  highResModal.style.display = "none";
  loadingModal.style.display = "flex";

  console.log("HD url: " + imgSrcHD);
  document.getElementById("output").src = imgSrcHD;
  document.getElementById("output").addEventListener("load", function (event) {
    displayModal();
  });
}

// displays modal when image loads
function displayModal() {
  console.log("debug: displaymodal called");
  if (load == 1) {
    console.log("debug: displaymodal called + load=1");
    loadingModal.style.display = "none";
    highResModal.style.display = "flex";
  }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == highResModal || event.target == loadingModal) {
    highResModal.style.display = "none";
    loadingModal.style.display = "none";
    load = 0;
  }
};
// When the user clicks on <span> (x), close the modal
closeModal.onclick = function () {
  highResModal.style.display = "none";
};

// gets the image to the right
rightArrow.onclick = function (event) {
  console.log("debug: right-->");
  if (currentImg < (imgFromList.length - 1)) {
    let rightImg = imgFromList.item([(currentImg++) + 1]).children[0]
    fetchHighRes(rightImg, currentImg);
  }
}

// gets the image to the left
leftArrow.onclick = function (event) {
  console.log("debug: <--left");
  if (currentImg > 0) {
    let leftImg = imgFromList.item([(currentImg--) - 1]).children[0]
    fetchHighRes(leftImg, currentImg);
  }
}

// click event for gallery images
for (let i = 0; i < imgFromList.length; i++) {
  imgFromList[i].addEventListener("click", function (event) {
    currentImg = i;
    fetchHighRes(imgFromList.item([i]).children[0], i);
  });
}


//collapsible

var collapseButton = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < collapseButton.length; i++) {
  collapseButton[i].addEventListener("click", function (event) {
    console.log("event target: " + event.target);
    let clickTarget = event.target;
    clickTarget.classList.toggle("active");
    var content = clickTarget.parentElement.nextElementSibling;
    console.log("max height: " + content.style.maxHeight);
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = "1200px";
      // arbritrary maxheight, may affect animation speed
      // scrollheight doesnt work :p
    }
  });
}

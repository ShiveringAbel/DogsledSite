//recoded 10/11/24 instead of writing an essay<3
//i pulled this from my own site, it might have some redundancies but i dont care enough to double check. it works fine as it is

var imgSrcHD;
var imgFromList = document.getElementsByTagName("li");
var load;
var currentImg;
var highResModal = document.getElementById("myModal");
var loadingModal = document.getElementById("myModal2");
var closeModal = document.getElementsByClassName("close")[0];
var credit = document.getElementById("credit");
var rightArrow = document.getElementById("right");
var leftArrow = document.getElementById("left");

// replaces modal image with high res image
function fetchHighRes(imgURL, indexHR) {
  console.log("img url: " + imgURL.src);

  //modifies downscaled image path to point towards upscaled image
    //ex: myimage_2k.jpg -> myimage.png
    imgSrcHD = imgURL.src.replace("jpg", "png");
    imgSrcHD = imgSrcHD.replace("_2k", ""); //replace this whatever ur file naming convention is
    //if ur downscaled images are in their own folder, uncomment this:
    /*
    //ex: images/galleryscaled/myimage_2k.jpg -> images/myimage.png
    let thumbPath = "galleryscaled/"; //change to ur folder path
    imgSrcHD = imgSrcHD.replace(thumbPath, "");
    */
  //
  load = 1;
  highResModal.style.display = "none";
  loadingModal.style.display = "flex";

  if (imgSrcHD.includes("fanart")) {
    getCredit(imgSrcHD)
  }
  else {
    credit.innerHTML = `Artist: <a href=https://freezerprince.tumblr.com/>Freezerprince</a>`
  }

  console.log("HD url: " + imgSrcHD);
  document.getElementById("output").src = imgSrcHD;
  document.getElementById("output").addEventListener("load", function (event) {
    displayModal();
  });
}


function getCredit(src_str) {
  // will have to simplify this in the future 
  const bwettyLink = "https://twitter.com/bettyywettyy"
  if (src_str.includes("bwetty")) {
    credit.innerHTML = `Artist: <a href=${bwettyLink}>Bettywetty</a>`
  }

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

//~ * ~ * ~ * ~ variables ~ * ~ * ~ * ~//

const API_LINK = 'https://sheetdb.io/api/v1/pzgyz1ngukw5u';
// please make sure that this link is the same as the linked action in comments.html !!
var disable_wall = false
// boolean that disables visibility of the message wall for debugging purposes
// (editing the site using a live preview with the message wall enabled will oveload the api)

var bugForm = document.getElementById("comment_box"); // id of comment input form
const MSGBOARD = document.getElementById("messageboard_test"); // id of messageboard element
var sheetArray = [];
let divArr = [];
let textArr = [];


//~ * ~ * ~ * ~ form response handling ~ * ~ * ~ * ~//

bugForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(bugForm.action, {
        method: "POST",
        body: new FormData(
            document.getElementById("comment_box")
        ),
    })
        .then((response) => response.json())
        .then((html) => {
            alert("your submission has been recorded!! thank you!!");
        });
})



//~ * ~ * ~ * ~ comment wall handling ~ * ~ * ~ * ~//

if (disable_wall) {
    displayError(1)
}
else {
    fetch(API_LINK + '?sort_by=date&sort_order=desc')
    .then((response) => response.json())
    .then((data) => {sheetArray = data; loadMessages(sheetArray)});
}

function loadMessages(data) {
    if ('error' in data) {
        displayError(0)
    }
    else {
    for (let i = 0; i< data.length; i++) {
        let tempObj = data[i];
        let C_DATE = tempObj.date;
        let C_NAME = tempObj.displayName;
        let C_BODY = tempObj.messageBody;

        divArr[i] = document.createElement("div")
        divArr[i].classList.add("comment_box")
        textArr[i] = document.createTextNode("")
        divArr[i].innerHTML = `
            <div class=message_header>
                <span class=display_name>${C_NAME}</span>
                <span class=buffer></span>
                <span class=comment_date>${C_DATE}</span>
            </div>
            <div class=message_body>
                <p>${C_BODY}</p>
            </div>
        `
        divArr[i].appendChild(textArr[i])
        MSGBOARD.appendChild(divArr[i])
    }}
    
}

function displayError(err_code) {
    document.getElementById("error_msg").style = "display: block;"
    if (err_code = 1) {
        document.getElementById("error_msg").innerHTML = "The message wall has been temporarily disabled."
    }
}
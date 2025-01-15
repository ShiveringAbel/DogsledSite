

const API_LINK = 'https://sheetdb.io/api/v1/pzgyz1ngukw5u';
// please make sure that this link is the same as the linked action in comments.html !!

var bugForm = document.getElementById("comment_box");
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

//table headers

var sheetArray = [];
const MSGBOARD = document.getElementById("messageboard_test");
let pArr = [];
let textArr = [];

fetch(API_LINK + '?sort_by=date&sort_order=desc')
  .then((response) => response.json())
  .then((data) => {sheetArray = data; loadMessages(sheetArray)});

function loadMessages(data) {
    if ('error' in data) {
        displayError()
    }
    else {
    for (let i = 0; i< data.length; i++) {
        let tempObj = data[i];
        let C_DATE = tempObj.date;
        let C_NAME = tempObj.displayName;
        let C_BODY = tempObj.messageBody;

        pArr[i] = document.createElement("div")
        pArr[i].classList.add("comment_box")
        textArr[i] = document.createTextNode("")
        pArr[i].innerHTML = `
            <div class=message_header>
                <span class=display_name>${C_NAME}</span>
                <span class=buffer></span>
                <span class=comment_date>${C_DATE}</span>
            </div>
            <div class=message_body>
                <p>${C_BODY}</p>
            </div>
        `
        pArr[i].appendChild(textArr[i])
        MSGBOARD.appendChild(pArr[i])
    }}
    
}

function displayError() {
    document.getElementById("error_msg").style = "display: block;"
}
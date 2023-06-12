/* Posts Page JavaScript */

"use strict";

const API_BASE_URL = "https://microbloglite.herokuapp.com";

window.addEventListener("load", function(){
    displayUserPost();
    document.getElementById("postBtn").onclick = postBtnOnClick;
    const signoutBtn = document.getElementById("signoutBtn")

    signoutBtn.onclick = function () {
        logout();
    }
})

// Add more posts when scrolling
window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        displayUserPost();
    }
});

// Creates the cards
function displayCard(data) {
    document.getElementById("divForPost").innerHTML += `
    <div class="row">
    <div class="card mb-3" style="max-width: auto;">
        <div class="card-body">
            <h4 class="card-title"> <span><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg></span> @${data.username} <span style="color: #999999; font-size: x-small;"> Posted On: ${monthDayYear(data.createdAt)}</span></h4>
            <p class="card-text">${data.text}</p>
        </div>
        <div class="card-footer bg-transparent">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example" style="width: 100%;">
                <button type="button" class="btn likeBtn" value="${data._id}" style="width: 33.3%;">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-hand-thumbs-up"
                            viewBox="0 0 16 16">
                            <path
                                d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                        </svg>
                        ${data.likes.length}
                    </span>
                </button>
                <button type="button" class="btn saveBtn" style="width: 33.3%;">
                    <span>
                        <img src="../images/deleteBtn.svg" alt="Delete Button" width="16" height="16">
                    </span>
                </button>
            </div>
        </div>
    </div>
</div>
    `;
}

// function displayCard(data) {
//     const divForPost = document.getElementById("divForPost");
  
//     const cardRow = document.createElement("div");
//     cardRow.classList.add("row");
  
//     const card = document.createElement("div");
//     card.classList.add("card", "mb-3");
//     card.style.maxWidth = "auto";
  
//     const cardBody = document.createElement("div");
//     cardBody.classList.add("card-body");
  
//     const cardTitle = document.createElement("h4");
//     cardTitle.classList.add("card-title");
  
//     const usernameSpan = document.createElement("span");
//     const usernameSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     usernameSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
//     usernameSvg.setAttribute("width", "60");
//     usernameSvg.setAttribute("height", "60");
//     usernameSvg.setAttribute("fill", "currentColor");
//     usernameSvg.classList.add("bi", "bi-person-circle");
//     usernameSvg.setAttribute("viewBox", "0 0 16 16");
  
//     const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     path1.setAttribute("d", "M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z");
  
//     const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     path2.setAttribute("fill-rule", "evenodd");
//     path2.setAttribute(
//     "d",
//     "M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
//     );
  
//     const usernameTextNode = document.createTextNode(` @${data.username}`);
//     const usernameTimeSpan = document.createElement("span");
//     usernameTimeSpan.style.color = "#999999";
//     usernameTimeSpan.style.fontSize = "x-small";
//     const postedOnTextNode = document.createTextNode(` Posted On: ${monthDayYear(data.createdAt)}`);
  
//     const cardText = document.createElement("p");
//     cardText.classList.add("card-text");
//     cardText.textContent = data.text;
  
//     const cardFooter = document.createElement("div");
//     cardFooter.classList.add("card-footer", "bg-transparent");
  
//     const btnGroup = document.createElement("div");
//     btnGroup.classList.add("btn-group");
//     btnGroup.setAttribute("role", "group");
//     btnGroup.setAttribute("aria-label", "Basic mixed styles example");
//     btnGroup.style.width = "100%";
  
//     const likeBtn = createButton("likeBtn", "bi bi-hand-thumbs-up", data.likes.length);
//     const commentBtn = createButton("commentBtn", "bi bi-chat");
//     const shareBtn = createButton("shareBtn", "bi bi-share");
//     const saveBtn = createButton("saveBtn", "bi bi-save2");
  
//     btnGroup.appendChild(likeBtn);
//     btnGroup.appendChild(commentBtn);
//     btnGroup.appendChild(shareBtn);
//     btnGroup.appendChild(saveBtn);
  
//     cardFooter.appendChild(btnGroup);
//     cardBody.appendChild(cardTitle);
//     cardBody.appendChild(cardText);
//     cardBody.appendChild(cardFooter);
//     card.appendChild(cardBody);
//     cardRow.appendChild(card);
//     divForPost.appendChild(cardRow);
//   }
  
//   function createButton(className, iconClass, count = "") {
//     const button = document.createElement("button");
//     button.classList.add("btn", className);
//     button.style.width = "33.3%";
  
//     const span = document.createElement("span");
  
//     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
//     svg.setAttribute("width", "16");
//     svg.setAttribute("height", "16");
//     svg.setAttribute("fill", "currentColor");


  
//     const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     // Set attributes for path
  
//     const countText = document.createTextNode(count);
  
//     span.appendChild(svg);
//     span.appendChild(countText);
//     button.appendChild(span);
//     return button;
// }
  
// Displays the posts + Grabs from the API
function displayUserPost() { 
    let loginData = getLoginData()

    document.getElementById("post").placeholder = `Welcome @` + loginData.username + ', care to share?';
    let postOutputList = document.getElementById("postOutputList")
    postOutputList.innerHTML = "";

    // Fetch 5 at a time + 5 per load
    fetch(API_BASE_URL + `/api/posts?limit=5&offset=0}`, {
        method: "GET", 
        headers: {"Authorization": `Bearer ${loginData.token}`,
                "Content-type":
                "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data =>   {
        // How to Sort Data? -- Newest First
        for (let i = data.length-1; i>=0; i--) {
                displayCard(data[i]);
            }
    })
}

// When the airplane BTN is clicked POST to server
function postBtnOnClick() {
    let inputElement = document.getElementById('post');
    let textToPost = inputElement.value;
    let data = { text: textToPost };
  
    let options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${loginData.token}`
      },
    };
  
    fetch(API_BASE_URL + "/api/posts", options)
      .then(response => {
        console.log(data)
        if (response.ok) {
          inputElement.value = '';
          setTimeout(function(){ location.reload(); }, 1000);
        }
    });
}

// Date Converter
function monthDayYear(date) {
    let givenDate = new Date(date);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = givenDate.getDate();
    let month = months[givenDate.getMonth()];
    let year = givenDate.getFullYear();
    let hours = givenDate.getHours();
    let minutes = givenDate.getMinutes();

    if (hours <= 12){
        let monthDayYear = `${month} ${day}, ${year} at ${hours}:${minutes.toString(10).padStart(2, '0')} AM`
        return monthDayYear;
    }
    else {
        let monthDayYear = `${month} ${day}, ${year} at ${hours - 12}:${minutes.toString(10).padStart(2, '0')} PM`
        return monthDayYear;
    }
}
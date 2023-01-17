/* Landing Page JavaScript */

"use strict";

// After the window loads and after the register button is clicked...
window.addEventListener('load', function () {
  this.document.getElementById("register").onclick = () => {
    // Values of Input Fields
    const username = document.getElementById("username").value;
    const pw = document.getElementById("psw").value;
    const confpw = document.getElementById("psw-repeat").value;
    const fullNameVal = this.document.getElementById("fullName").value;
    // TODO: CALL ON CLEAR MSG FUNCTION
    clearMsg();

    const isEmpty = (!(username && pw && confpw))
    if (!isEmpty && (pw === confpw)) {
      console.log("All fields were successfully filled.")
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "username": username,
        "fullName": fullNameVal,
        "password": pw
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };
      fetch("https://microbloglite.herokuapp.com/api/users", requestOptions)
      .then(response => {
          if(!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json()
      })
      .then(json => {
          setTimeout(
              function () {
                  window.location.assign("index.html");
              }, 5000);
         msg.innerHTML = "User created successfully, Redirecting to Log In page"
  
      })
      .catch(error => {
        msg.innerHTML = "Something went wrong... check console."
          console.error("Error:", error);
      });
  
    } 
    else {
      msg.innerHTML = "Something went wrong... check console."
      if (isEmpty) {
        console.log("Check for blank fields")
      } else if (pw !== confpw) {
        console.log("Passwords don't match.")
      }
    }
  }
})

function clearMsg() {
  const msg = document.getElementById("msg")
  msg.innerHTML = ""
}
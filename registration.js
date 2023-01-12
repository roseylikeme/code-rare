/* Landing Page JavaScript */

"use strict";

// After the window loads and after the register button is clicked...
window.addEventListener('load', function () {
  this.document.getElementById("register").onclick = () => {
    // Values of Input Fields
    const username = document.getElementById("username").value;
    const pw = document.getElementById("psw").value;
    const confpw = document.getElementById("psw-repeat").value;
    // const form = document.getElementById("register-form");
    const msg = document.getElementById("msg")
    msg.innerHTML = ""

    const isEmpty = (!(username && pw && confpw))
    if (!isEmpty && (pw === confpw)) {
      console.log("All fields were successfully filled.")
      let getData = {
        username: username,
        password: pw
      }

      fetch("https://microbloglite.herokuapp.com/api/users",
      {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(getData)
      })
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
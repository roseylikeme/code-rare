/* Landing Page JavaScript */

"use strict";

// After the window loads and after the register button is clicked...
window.addEventListener('load', function () {
  this.document.getElementById("register").onclick = () => {
    // Values of Input Fields
    const email = document.getElementById("email").value;
    const pw = document.getElementById("psw").value;
    const confpw = document.getElementById("psw-repeat").value;
    // const form = document.getElementById("register-form");
    const msg = document.getElementById("msg")
    msg.innerHTML = ""

    const isEmpty = (!(email && pw && confpw))
    if (!isEmpty && (pw === confpw)) {
      console.log("All fields were successfully filled.")

      let userData = {
        email: email,
        password: pw
      }

      fetch("https://microbloglite.herokuapp.com/api/users",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(getData)
        })
        .then(response => response.json())
        .then(json => {
          setTimeout(
            function () {
              window.location.assign("index.html");
            }, 5000);
          msg.innerHTML = "User created successfully, Redirecting to Log In page"
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
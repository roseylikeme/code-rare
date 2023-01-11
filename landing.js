/* Landing Page JavaScript */

"use strict";

const loginForm = document.querySelector("#login");

loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};

// Registration Page Javascript 

 // Add event listener to form
 const form = document.getElementById("register-form");
 form.addEventListener("submit", handleSubmit);

 function handleSubmit(event) {
   event.preventDefault();

   // Get values of input fields
   const email = document.getElementById("email").value;
   const password = document.getElementById("psw").value;
   const repeatPassword = document.getElementById("psw-repeat").value;

   // Check if passwords match
   if (password !== repeatPassword) {
     alert("Passwords do not match. Please try again.");
     return;
   }

   // Create body object for fetch request
   const userData = {
     email: email,
     password: password
   };

   // Perform fetch request
   fetch("https://microbloglite.herokuapp.com/api/users", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(userData)
   })
     .then(response => {
       if (response.status === 201) {
         // registration was successful
         alert("Registration Successful! You will now be redirected to the login page.");
         return window.location.href = '/login';
       } else {
         // registration was not successful
         throw new Error("Registration failed");
       }
     })
     .catch(error => {
       console.error(error);
       alert("An error occurred during registration. Please try again later.");
     });
 }
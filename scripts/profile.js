"use strict";

// init vars here
const currentUser = getLoginData().username;
const userFullName = document.getElementById("fullName");
const userCreationDate = document.getElementById("createdAt");
const signoutBtn = document.getElementById("signoutBtn");
const bio = document.getElementById("bio");
const fullNameInput = document.getElementById("fullNameInput");
const bioInput = document.getElementById("bioInput");
const saveEditsBtn = document.getElementById("editSaveBtn");

window.addEventListener("load", function () {
    displayPost();
    moreInfo();
    signoutBtn.onclick = function () {
        logout();
    };
    saveEditsBtn.onclick = updateProfile;
    document.getElementById("postBtn").onclick = postBtnOnClick;
    document.getElementById("name").innerText = "@" + currentUser;
});

// Update Profile when Edit Profile Saved
function updateProfile(event) {
    event.preventDefault();

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getLoginData().token}`,
        },
        body: JSON.stringify({
            bio: bioInput.value,
            fullName: fullNameInput.value,
        }),
    };
    fetch(
        api + "/api/users/" + getLoginData().username,
        options
    )
        .then((response) => response.json())
        .then((data) => {
            setTimeout(function () {
                location.reload();
            }, 1000); // Refreshes the page.
        });
}

// Grab Full Name
function moreInfo() {
    fetch(api + `/api/users/${getLoginData().username}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getLoginData().token}`,
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            userFullName.innerHTML = data.fullName;
            userCreationDate.innerHTML = formatDateWithTime(data.createdAt);
            bio.innerHTML = data.bio;
        });
}

// Display Posts
function displayPost() {
    fetch(
        api + `/api/posts?username=${currentUser}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getLoginData().token}`,
                "Content-type": "application/json; charset=UTF-8",
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            data.forEach((post) => {displayCard(post)})
        });
}
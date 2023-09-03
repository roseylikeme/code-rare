/* Posts Page JavaScript */

"use strict";

window.addEventListener("load", function () {
  displayPost();
  document.getElementById("post").placeholder =
    `Welcome @` + getLoginData().username + ", care to share?";
  document.getElementById("postBtn").onclick = createPost;
  const signoutBtn = document.getElementById("signoutBtn");

  signoutBtn.onclick = function () {
    logout();
  };
});

function displayPost() {
  clearPostsContainer();
  let postOutputList = document.getElementById("postOutputList");
  postOutputList.innerHTML = "";

  fetch(api + `/api/posts?limit=500&offset=0}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getLoginData().token}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      data.forEach((post) => {
        displayCard(post);
      });

    });
}
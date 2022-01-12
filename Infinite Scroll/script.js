const searchInput = document.getElementById("filter");

const posts = document.getElementById("post-container");

const loader = document.getElementById("loader");

const URL_POST = "https://jsonplaceholder.typicode.com/";
// get intitla posts on page load

let limit = 3;
let page = 1;

console.log("searchInput ", searchInput);
// get initial posts
async function getPosts() {
  // getting cors error because host was file://
  // start live server on any host
  // this will resolve the issue
  // use async await
  // check response object and do response.json()
  const response = await fetch(
    `${URL_POST}posts?_limit=${limit}&_page=${page}`
  );
  const data = await response.json();
  return data;
}

//show data on dom
async function showData() {
  // get class Name
  // create div element
  // add that div element with innerText
  const postsData = await getPosts();

  console.log("postsData ", postsData);
  postsData.forEach((post) => {
    const element = document.createElement("div");
    element.classList.add("post");
    element.innerHTML = `<div class = "number">${post.id}</div>
      <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="body">${post.body}</p>
  </div>`;
    posts.appendChild(element);
  });
}

window.addEventListener("load", showData());

//show loader and fetch more posts
function showLoader() {
  // show the loader before fetching data
  loader.classList.add("show");
  console.log("loader ", loader);
  //request data page and limit
  setTimeout(() => {
    loader.classList.remove("show"); // rmeove after 1 sec
    console.log("timeout 1000");
    setTimeout(() => {
      console.log("timeout 300");
      page++;
      showData();
    }, 300);
  }, 900);
}

function filterPosts(e) {
  // grab the term
  const value = e.target.value;
  console.log("value ", value);
  // grab all the posts
  const postsAll = document.querySelectorAll(".post");
  console.log("posts ", postsAll);
  postsAll.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.topUpperCase();
    const body = post.querySelector(".body").innerText.toUpperCase();
    if (
      title.indexOf(value.toUpperCase()) > -1 ||
      body.indexOf(value.toUpperCase()) > -1
    ) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
  // search inside title and body
  // filter the other div tags that dont satisy the condition
}
window.addEventListener("scroll", () => {
  //
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    showLoader();
  }
});

searchInput.addEventListener("input", (e) => {
  filterPosts(e);
});

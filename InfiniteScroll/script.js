// https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}

// get access to the div elements

const postContainer = document.getElementById("post-container");
const filterContainer = document.querySelector(".filter-container");
const loader = document.querySelector(".loader");

let limit = 3;
let page = 1;

// fetch posts
async function getPosts() {
  //https://jsonplaceholder.typicode.com/posts?_limit=3&_page=1
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = res.json();
  return data; // data will have an array of posts
}

// show posts on DOM
async function showPosts() {
  const posts = await getPosts();
  // create post div
  // add the innerHtml to it
  console.log("postContainer ", postContainer);
  posts.forEach((post) => {
    // create element
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `<div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title"> ${post.title}</h2>
                <p class="post-body"> ${post.body}</p> 
            </div>
        </div>`;
    postContainer.appendChild(postEl);
  });
}

function filterPosts(e) {
  // get the target value
  // check the value in the title and the body
  const term = e.target.value.toUpperCase();
  console.log("term");
  // get access to the posts
  // for each post -> check if term is there
  // if term is not there -> set tyle to none
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    // check if term is there in the posts
    const postTitle = post.querySelector(".post-title").innerText.toUpperCase();
    const postBody = post.querySelector(".post-body").innerText.toUpperCase();

    if (postTitle.indexOf(term) > -1 || postBody.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

function showLoading() {
  // add class of show to loader
  // increase pagesize and call showpost
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 500);
  }, 1000);
}

// hit the initial call
showPosts();

// infinite scroll
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

// for filter functionality
filterContainer.addEventListener("input", filterPosts);

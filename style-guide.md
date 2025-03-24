# Front-end Style Guide

## Layout

The designs were created to the following widths:

- Mobile: 375px
- Desktop: 1440px

> 💡 These are just the design sizes. Ensure content is responsive and meets WCAG requirements by testing the full range of screen sizes from 320px to large screens.

## Colors

### Primary

- Desaturated Dark Cyan: hsl(180, 29%, 50%)

### Neutral

- Light Grayish Cyan (Background): hsl(180, 52%, 96%)
- Light Grayish Cyan (Filter Tablets): hsl(180, 31%, 95%)
- Dark Grayish Cyan: hsl(180, 8%, 52%)
- Very Dark Grayish Cyan: hsl(180, 14%, 20%)

## Typography

### Body Copy

- Font size: 15px

### Headings

- Family: [League Spartan](https://fonts.google.com/specimen/League+Spartan)
- Weights: 500, 700

> 💎 [Upgrade to Pro](https://www.frontendmentor.io/pro?ref=style-guide) for design file access to see all design details and get hands-on experience using a professional workflow with tools like Figma.

<!-- Item Start -->

Photosnap
New!
Featured
Senior Frontend Developer
1d ago
Full Time
USA only

  <!-- Role -->

Frontend

  <!-- Level -->

Senior

  <!-- Languages -->

HTML
CSS
JavaScript

  <!-- Item End -->

  <!-- Item Start -->

Manage
New!
Featured
Fullstack Developer
1d ago
Part Time
Remote

  <!-- Role -->

Fullstack

  <!-- Level -->

Midweight

  <!-- Languages -->

Python

  <!-- Tools -->

React

  <!-- Item End -->

  <!-- Item Start -->

Account
New!
Junior Frontend Developer
2d ago
Part Time
USA only

  <!-- Role -->

Frontend

  <!-- Level -->

Junior

  <!-- Languages -->

JavaScript

  <!-- Tools -->

React
Sass

  <!-- Item End -->

  <!-- Item Start -->

MyHome
Junior Frontend Developer
5d ago
Contract
USA only

  <!-- Role -->

Frontend

  <!-- Level -->

Junior

  <!-- Languages -->

CSS
JavaScript

  <!-- Item End -->

  <!-- Item Start -->

Loop Studios
Software Engineer
1w ago
Full Time
Worldwide

  <!-- Role -->

Fullstack

  <!-- Level -->

Midweight

  <!-- Languages -->

JavaScript
Ruby

  <!-- Tools -->

Sass

  <!-- Item End -->

  <!-- Item Start -->

FaceIt
Junior Backend Developer
2w ago
Full Time
UK only

  <!-- Role -->

Backend

  <!-- Level -->

Junior

  <!-- Languages -->

Ruby

  <!-- Tools -->

RoR

  <!-- Item End -->

  <!-- Item Start -->

Shortly
Junior Developer
2w ago
Full Time
Worldwide

  <!-- Role -->

Frontend

  <!-- Level -->

Junior

  <!-- Languages -->

HTML
JavaScript

  <!-- Tools -->

Sass

  <!-- Item End -->

  <!-- Item Start -->

Insure
Junior Frontend Developer
2w ago
Full Time
USA only

  <!-- Role -->

Frontend

  <!-- Level -->

Junior

  <!-- Languages -->

JavaScript

  <!-- Tools -->

Vue
Sass

  <!-- Item End -->

  <!-- Item Start -->

Eyecam Co.
Full Stack Engineer
3w ago
Full Time
Worldwide

  <!-- Role -->

Fullstack

  <!-- Level -->

Midweight

  <!-- Languages -->

JavaScript
Python

  <!-- Tools -->

Django

  <!-- Item End -->

  <!-- Item Start -->

The Air Filter Company
Front-end Dev
1mo ago
Part Time
Worldwide

  <!-- Role -->

Frontend

  <!-- Level -->

Junior

  <!-- Languages -->

JavaScript

  <!-- Tools -->

React
Sass

  <!-- Item End -->

"use strict";

const main = document.querySelector("main");
const filter = document.querySelector(".filter-sub");
const clear = document.querySelector(".clear");

let closes = [];
let arr = [];

(async function () {
const res = await fetch("./data.json");
const data = await res.json();
data.forEach((job) => {
const container = document.createElement("div");
container.innerHTML = `      <img src="${job.logo}" alt="company-logo"/>
      <div class="head">
        <div class="wrapper">
          <div class="top">
            <h2>${job.company}</h2>
            <div class="stat"></div>
          </div>
          <a href="#">${job.position}</a>
          <ul class="availability">
            <li>${job.postedAt}</li>
            <li>${job.contract}</li>
            <li>${job.location}</li>
          </ul>  
        </div>
        <hr/>
        <div class="tags"></div>
      </div>    
   `;

    if (job.new) {
      const span = document.createElement("span");
      span.classList.add("new");
      span.textContent = "New!";
      container.querySelector(".stat").append(span);
    }

    if (job.featured) {
      const span = document.createElement("span");
      span.classList.add("feature");
      span.textContent = "Featured";
      container.querySelector(".stat").append(span);
    }

    const types = job.position.split(" ");

    const btn1 = document.createElement("button");
    btn1.dataset.type = job.role;
    btn1.textContent = job.role;
    container.querySelector(".tags").appendChild(btn1);

    const btn2 = document.createElement("button");
    btn2.dataset.type = job.level;
    btn2.textContent = job.level;
    container.querySelector(".tags").appendChild(btn2);

    job.languages.forEach((lang) => {
      const btn = document.createElement("button");
      btn.dataset.type = lang;
      btn.textContent = lang;
      container.querySelector(".tags").appendChild(btn);
    });

    job.tools.forEach((tool) => {
      const btn = document.createElement("button");
      btn.dataset.type = tool;
      btn.textContent = tool;
      container.querySelector(".tags").appendChild(btn);
    });

    main.appendChild(container);

});

const buttons = main.querySelectorAll(".tags button");
buttons.forEach((button) => {
button.addEventListener("click", () => {
filterType(button.dataset.type);
updateContainer();
});
});
})();

clear.addEventListener("click", () => {
arr = [];
filter.innerHTML = "";
main
.querySelectorAll(".container")
.forEach((container) => container.classList.remove("remove"));
filter.closest(".filter").styledisplay = "none";
});

function addFilter() {
filter.innerHTML = "";
arr.forEach((element) => {
const El = document.createElement("div");
El.classList.add("span");
El.innerHTML = `      <p>${element}</p>
      <button aria-label="remove button">
        <img src="imgaes/icon-remove.svg" alt="remove btn"/>
      </button>
   `;
filter.appendChild(El);
filter.closest(".filter").style.display = "flex";

    closes = [];
    closes.push(El.querySelector("button"));
    closes.forEach((close) => {
      close.addEventListener("click", () => {
        filter.removeChild(close.closest(".span"));
        arr.splice(arr.indexOf(close.previousElementSibling.textContent), 1);
        updateContainer();
        if (filter.innerHTML) {
          filter.closest(".filter").style.display = "flex";
        } else {
          filter.closest(".filter").style.display = "none";
        }
      });
    });

});
}

function filterType(type) {
if (!arr.includes(type)) {
arr.push(type);
addFilter();
}
}

function updateContainer() {
const containers = main.querySelectorAll("container");
containers.forEach((container) => {
const buttons = container.querySelector("button");
let check = [];
buttons.forEach((button) => {
check.push(button.dataset.type);
});
});

let include = true;
arr.forEach((element) => {
if (!check.includes(element)) {
include = false;
}
});

if (!include) {
container.classList.add("remove");
} else {
container.classList.remove("remove");
}
}

function changeBg() {
if (document.body.clientWidth < 700) {
Headers.style["background-image"] = "url(images/bg-header-mobile.svg)";
} else {
Headers.style["background-image"] = "url(images/bg-header-desktop.svg)";
}
}

changeBg();
window.onresize = changeBg;

"use strict";

const section = document.querySelector("section");

async function getData() {
  const res = await fetch("./data.json");
  const data = await res.json();
  data.forEach((job) => {
    const container = document.createElement("div");
    container.innerHTML = `
      <img src="${job.logo}" alt="company-logo"/>
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

    section.appendChild(container);
  });
}
getData();

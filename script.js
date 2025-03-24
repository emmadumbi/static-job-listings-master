"use strict";

const filterContainer = document.querySelector(".filter-container");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector("#clear");
const joblistings = document.querySelector("#job-listings");

let selectedFilters = [];

(async function () {
  const res = await fetch("./data.json");
  const data = await res.json();
  data.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");
    jobCard.innerHTML = `
      <img src="${job.logo}" alt="company logo"/>
      <div class="heading">
        <h1>${job.company}</h1>
        <div class="stat"></div>
      </div>
      <p>${job.position}</p>
      <span>${job.postedAt}</span>
      <span>${job.contract}</span>
      <span>${job.location}</span>
      <hr>
      <div class="tags"></div>

    `;

    const types = job.position.split(" ");

    const roleBtn = document.createElement("button");
    roleBtn.textContent = job.role;
    jobCard.querySelector(".tags").appendChild(roleBtn);

    const levelBtn = document.createElement("button");
    levelBtn.textContent = job.level;
    jobCard.querySelector(".tags").appendChild(levelBtn);

    job.languages.forEach((lang) => {
      const langbtn = document.createElement("button");
      langbtn.textContent = lang;
      jobCard.querySelector(".tags").appendChild(langbtn);
    });

    job.tools.forEach((tool) => {
      const toolbtn = document.createElement("button");
      toolbtn.textContent = tool;
      jobCard.querySelector(".tags").appendChild(toolbtn);
    });

    if (job.new) {
      const newJob = document.createElement("span");
      newJob.textContent = "New!";
      newJob.classList.add("new-Job");
      jobCard.querySelector(".stat").appendChild(newJob);
    }

    if (job.featured) {
      const featuredJob = document.createElement("span");
      featuredJob.textContent = "Featured";
      featuredJob.classList.add("featured-Job");
      jobCard.querySelector(".stat").appendChild(featuredJob);
    }

    joblistings.appendChild(jobCard);
  });
  addFilter();
})();

function addFilter() {
  document.querySelectorAll(".tags button").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!selectedFilters.includes(btn.textContent)) {
        selectedFilters.push(btn.textContent);
        const filterTag = document.createElement("button");
        filterTag.textContent = btn.textContent;

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = `<img src="images/icon-remove.svg" alt="remove tag button"/>`;
        removeBtn.addEventListener("click", () => {
          removeFilterTag(btn.textContent, filterTag);
        });

        filterTag.appendChild(removeBtn);
        filter.appendChild(filterTag);
        filterContainer.style.display = "flex";
      }
    });
  });
}

function removeFilterTag(tag, filterTagElement) {
  selectedFilters = selectedFilters.filter((item) => item !== tag);
  filterTagElement.remove();

  if (selectedFilters.length === 0) {
    filterContainer.style.display = "none";
  }
}

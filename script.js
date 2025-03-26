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
    jobCard.classList.add("jobCard");
    jobCard.innerHTML = `
      <div class="heading-container">
        <div>
          <img class="company-logo" src="${job.logo}" alt="company logo"/>
        </div>
        <div>
          <div class="heading">
            <h1>${job.company}</h1>
            <div class="stat"></div>
          </div>
          <p class="jobPosition">${job.position}</p>
          <ul class="availability">
            <li>${job.postedAt}</li>
            <li>${job.contract}</li>
            <li>${job.location}</li>
          </ul> 
         </div> 
      </div>
      <hr>
      <div class="tags"></div>
    `;

    const roleBtn = document.createElement("button");
    roleBtn.textContent = job.role;
    jobCard.querySelector(".tags").appendChild(roleBtn);

    const levelBtn = document.createElement("button");
    levelBtn.textContent = job.level;
    jobCard.querySelector(".tags").appendChild(levelBtn);

    job.languages.forEach((lang) => {
      const langBtn = document.createElement("button");
      langBtn.textContent = lang;
      jobCard.querySelector(".tags").appendChild(langBtn);
    });

    job.tools.forEach((tool) => {
      const toolBtn = document.createElement("button");
      toolBtn.textContent = tool;
      jobCard.querySelector(".tags").appendChild(toolBtn);
    });

    if (job.new) {
      const newJob = document.createElement("span");
      newJob.textContent = "NEW!";
      newJob.classList.add("new-Job");
      jobCard.querySelector(".stat").appendChild(newJob);
    }

    if (job.featured) {
      const featuredJob = document.createElement("span");
      featuredJob.textContent = "FEATURED";
      featuredJob.classList.add("featured-Job");
      jobCard.classList.add("featured");
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
        filterTag.classList.add("tagBtn");

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("clearTag");
        removeBtn.innerHTML = `<img src="images/icon-remove.svg" alt="remove tag button"/>`;
        removeBtn.addEventListener("click", () => {
          removeFilterTag(btn.textContent, filterTag);
          document
            .querySelectorAll("#job-listings > div")
            .forEach((jobCard) => {
              jobCard.style.display = "flex";
              jobCard.classList.remove("hidden");
            });
        });

        filterTag.appendChild(removeBtn);
        filter.appendChild(filterTag);
        filter.classList.add("filter");
        filterContainer.style.display = "flex";

        filterJobs();
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

  filterJobs();
}

function filterJobs() {
  document.querySelectorAll("#job-listings > div").forEach((jobCard) => {
    const jobTags = Array.from(jobCard.querySelectorAll(".tags button")).map(
      (btn) => btn.textContent
    );

    const matchesAllFilters = selectedFilters.every((filter) =>
      jobTags.includes(filter)
    );

    if (matchesAllFilters) {
      jobCard.style.display = "flex";
    } else {
      jobCard.classList.add("hidden");
    }
  });
}

clearBtn.addEventListener("click", () => {
  selectedFilters = [];
  filter.innerHTML = "";
  filterContainer.style.display = "none";

  document.querySelectorAll("#job-listings > div").forEach((jobCard) => {
    jobCard.style.display = "flex";
    jobCard.classList.remove("hidden");
  });
});

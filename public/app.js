const form = document.querySelector("#controls");
const results = document.querySelector("#results");

form.addEventListener("submit", event => {
  event.preventDefault();
  loadProjects();
});

async function loadProjects() {
  const params = new URLSearchParams(new FormData(form));
  const response = await fetch(`/api/projects?${params}`);
  const payload = await response.json();

  results.innerHTML = payload.projects.map(project => `
    <article>
      <p class="meta">${project.category} | score ${project.score}</p>
      <h2>${project.title}</h2>
      <p>${project.skills.join(", ")}</p>
      <p class="meta">${project.reasons.join(" / ")}</p>
    </article>
  `).join("");
}

loadProjects();

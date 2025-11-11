import { loadHeaderFooter } from "./components.js";
import { fetchUpcomingLaunches } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  try {
    const launches = await fetchUpcomingLaunches();
    if (!launches || launches.length === 0) return;

    // Missions section: first 2 launches
    const missionsContainer = document.getElementById(
      "missionsLaunchContainer"
    );
    launches.slice(0, 2).forEach((launch) => {
      const card = document.createElement("div");
      card.classList.add("launch-card");
      card.innerHTML = `
        <h3>${launch.name}</h3>
        <p><strong>Launch Window:</strong> ${launch.net}</p>
        <p><strong>Rocket:</strong> ${
          launch.rocket?.configuration?.name || "N/A"
        }</p>
        <a href="${
          launch.webcast_live || "#"
        }" target="_blank" class="btn-fav">Watch Live</a>
      `;
      missionsContainer.appendChild(card);
    });

    // Connect section: next 2 launches
    const connectContainer = document.getElementById("connectLaunchContainer");
    launches.slice(2, 4).forEach((launch) => {
      const card = document.createElement("div");
      card.classList.add("launch-card");
      card.innerHTML = `
        <h3>${launch.name}</h3>
        <p><strong>Launch Window:</strong> ${launch.net}</p>
        <p><strong>Rocket:</strong> ${
          launch.rocket?.configuration?.name || "N/A"
        }</p>
        <a href="${
          launch.webcast_live || "#"
        }" target="_blank" class="btn-fav">Watch Live</a>
      `;
      connectContainer.appendChild(card);
    });

    // Launches section: next 2 launches
    const launchesContainer = document.getElementById(
      "launchesLaunchContainer"
    );
    launches.slice(4, 6).forEach((launch) => {
      const card = document.createElement("div");
      card.classList.add("launch-card");
      card.innerHTML = `
        <h3>${launch.name}</h3>
        <p><strong>Launch Window:</strong> ${launch.net}</p>
        <p><strong>Rocket:</strong> ${
          launch.rocket?.configuration?.name || "N/A"
        }</p>
        <a href="${
          launch.webcast_live || "#"
        }" target="_blank" class="btn-fav">Watch Live</a>
      `;
      launchesContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching launches:", error);
  }
});

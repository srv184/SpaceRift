/* =========================================================
   SpaceRift — Favorites Logic
   Author: Sourav Kumar Bhagat
   Description: Displays user's saved launches from localStorage
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("favoritesContainer");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    container.innerHTML = `<p class="error-text">⭐ You haven’t added any favorite launches yet.</p>`;
    return;
  }

  // Fetch all upcoming launches again to get details
  const launches = await fetchUpcomingLaunches();

  // Match favorite IDs with fetched data
  const favLaunches = launches.filter((launch) =>
    favorites.some((fav) => fav.id === launch.id)
  );

  if (favLaunches.length === 0) {
    container.innerHTML = `<p class="error-text">❌ These favorites are no longer upcoming launches.</p>`;
    return;
  }

  // Render cards
  favLaunches.forEach((launch) => {
    const { name, window_start, pad, rocket, image, mission, id } = launch;

    const location = pad?.name || "Unknown Location";
    const agency =
      rocket?.configuration?.manufacturer?.name || "Unknown Agency";
    const missionName = mission?.name || "N/A";
    const imgSrc = image || "assets/images/placeholder-launch.jpg";

    const card = document.createElement("div");
    card.className = "launch-card";

    card.innerHTML = `
      <img src="${imgSrc}" alt="${name}" class="launch-img">
      <div class="launch-details">
        <h3>${name}</h3>
        <p><strong>Agency:</strong> ${agency}</p>
        <p><strong>Mission:</strong> ${missionName}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Launch Time:</strong> ${formatDateTime(window_start)}</p>
        <button class="btn-fav" onclick="removeFavorite('${id}', '${name}')">❌ Remove</button>
      </div>
    `;

    container.appendChild(card);
  });
});

/* ---------- Format Launch Date ---------- */
function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  return date.toUTCString().replace("GMT", "UTC");
}

/* ---------- Remove from Favorites ---------- */
function removeFavorite(id, name) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((fav) => fav.id !== id);

  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert(`❌ Removed from Favorites: ${name}`);
  location.reload();
}

/* =========================================================
   SpaceRift — Utility Functions
   Author: Sourav Kumar Bhagat
   Description: Reusable helpers for UI and data handling
   ========================================================= */

// 🔹 Format date in readable form (e.g., "12 Nov 2025, 14:30 UTC")
export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toUTCString().replace("GMT", "UTC");
}

// 🔹 Create countdown (returns remaining time as string)
export function getCountdown(isoString) {
  const launchTime = new Date(isoString).getTime();
  const now = Date.now();
  const diff = launchTime - now;

  if (diff <= 0) return "🚀 Launched";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// 🔹 Check if user is logged in
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// 🔹 Save favorite launch
export function saveFavorite(launch) {
  const user = getCurrentUser();
  if (!user) {
    alert("⚠️ Please login to save favorites!");
    window.location.href = "login.html";
    return;
  }

  const key = `favorites_${user.email}`;
  const favorites = JSON.parse(localStorage.getItem(key)) || [];

  // avoid duplicates
  if (favorites.some((f) => f.id === launch.id)) {
    alert("⭐ Already in favorites!");
    return;
  }

  favorites.push(launch);
  localStorage.setItem(key, JSON.stringify(favorites));
  alert("✅ Added to favorites!");
}

// 🔹 Remove favorite launch
export function removeFavorite(launchId) {
  const user = getCurrentUser();
  if (!user) return;

  const key = `favorites_${user.email}`;
  let favorites = JSON.parse(localStorage.getItem(key)) || [];
  favorites = favorites.filter((f) => f.id !== launchId);

  localStorage.setItem(key, JSON.stringify(favorites));
}

// 🔹 Fetch user’s favorite launches
export function getFavorites() {
  const user = getCurrentUser();
  if (!user) return [];
  const key = `favorites_${user.email}`;
  return JSON.parse(localStorage.getItem(key)) || [];
}

// 🔹 Create a launch card element
export function createLaunchCard(launch, includeFavButton = true) {
  const card = document.createElement("div");
  card.className = "launch-card";

  card.innerHTML = `
    <h3>${launch.name}</h3>
    <p><strong>Date:</strong> ${formatDate(launch.net)}</p>
    <p><strong>Agency:</strong> ${
      launch.launch_service_provider?.name || "N/A"
    }</p>
    <p><strong>Location:</strong> ${launch.pad?.location?.name || "Unknown"}</p>
    <p><strong>Status:</strong> ${launch.status?.name || "N/A"}</p>
    <p><strong>Countdown:</strong> <span class="countdown">${getCountdown(
      launch.net
    )}</span></p>
    ${
      includeFavButton
        ? `<button class="fav-btn" data-id="${launch.id}">⭐ Favorite</button>`
        : ""
    }
  `;

  return card;
}

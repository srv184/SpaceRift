// assets/js/api.js

const API_URL = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/";

export async function fetchUpcomingLaunches() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch upcoming launches");
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("API fetch error:", error);
    return [];
  }
}

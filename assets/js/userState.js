/* =========================================================
   SpaceRift — Dynamic User State (Login/Logout Display)
   Author: Sourav Kumar Bhagat
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("authLink");
  const userInfo = document.getElementById("userInfo");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    // User is logged in
    userInfo.textContent = `Welcome, ${currentUser.email}`;
    userInfo.style.color = "#0ff";
    userInfo.style.marginRight = "10px";

    authLink.textContent = "Logout";
    authLink.href = "#";
    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      const confirmLogout = confirm("🚀 Logout from SpaceRift?");
      if (confirmLogout) {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
      }
    });
  } else {
    // User not logged in
    userInfo.textContent = "";
    authLink.textContent = "Login";
    authLink.href = "login.html";
  }
});

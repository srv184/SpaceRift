/* =========================================================
   SpaceRift — Frontend Authentication System
   Author: Sourav Kumar Bhagat
   Description: Login / Signup using localStorage only
   ========================================================= */

const authForm = document.getElementById("authForm");
const switchMode = document.getElementById("switchMode");
const authTitle = document.getElementById("authTitle");
const authButton = document.getElementById("authButton");

let isLoginMode = true;

// Switch between login and signup modes
switchMode.addEventListener("click", (e) => {
  e.preventDefault();
  isLoginMode = !isLoginMode;

  authTitle.textContent = isLoginMode ? "Login" : "Sign Up";
  authButton.textContent = isLoginMode ? "Login" : "Sign Up";
  switchMode.textContent = isLoginMode ? "Create one" : "Login instead";
});

// Handle form submit
authForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("⚠️ Please fill in all fields!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (isLoginMode) {
    // LOGIN
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert(`🚀 Welcome back, ${email}!`);
      window.location.href = "index.html";
    } else {
      alert("❌ Invalid email or password!");
    }
  } else {
    // SIGN UP
    const exists = users.some((u) => u.email === email);

    if (exists) {
      alert("⚠️ Email already exists! Try logging in.");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert(`✅ Account created successfully!`);
    window.location.href = "index.html";
  }
});

// Auto redirect if already logged in
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    alert(`✨ You’re already logged in as ${currentUser.email}`);
    window.location.href = "index.html";
  }
});

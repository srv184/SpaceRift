# 🚀 SpaceRift

**SpaceRift** — a lightweight, beautiful space launch tracker built by Sourav Kumar Bhagat.  
It fetches upcoming launch data from The SpaceDevs API and presents it in a video-backed, SpaceX-inspired UI. Users can save favorite launches to localStorage for quick access.

---

## Demo (local)

Run the backend, open the app in your browser, and enjoy live launch data.

---

## Features

- Fullscreen video sections with overlayed information (hero, missions, connect, launches).
- Live upcoming launch data fetched via a backend proxy to The SpaceDevs API.
- Add launches to **Favorites** (saved in `localStorage`) and view/manage them on a separate page.
- Transparent, sticky header & footer loaded as components.
- Responsive layout inspired by SpaceX styling.
- Simple auth UI (local-only sign up / login stored in `localStorage`).

---

## Project structure (important)

/SpaceRift
├── assets/ # CSS, JS modules, images/videos
├── backend/ # Node/Express backend (server.js, package.json)
├── components/ # header.html, footer.html
├── index.html
├── favorites.html
├── login.html
├── README.md
└── .gitignore

- Frontend files (HTML/CSS/JS/video) are in the repo root and `assets/`.
- Backend (Express) lives in `/backend` and serves API endpoints and the frontend.

---

## Quick start (local)

1. Install backend dependencies:

```bash
cd backend
npm install
npm start
```

## How it works

The frontend calls /api/launches which your Express backend proxies to:
https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=...

Header and footer are fetched from components/header.html and components/footer.html.

Favorites are stored in localStorage as an array of launch objects.

Deploying on Render (recommended)

Push repo to GitHub.

Create a new Web Service on Render.

Root Directory: backend

Build Command: npm install

Start Command: npm start

Render will run the backend server which also serves the frontend files.

## Notes & tips

Compress your background videos before deployment to reduce bandwidth.

config.js uses BASE_URL: "/api/" so frontend and backend share the same origin.

This project uses ES modules — backend/package.json should include "type": "module".

## Author

Built with 💫 by Sourav Kumar Bhagat.

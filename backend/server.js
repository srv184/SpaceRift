import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allow CORS
app.use(cors());
app.use(express.json());

// ✅ Serve frontend files from project root
app.use(express.static(path.join(__dirname, "../")));

// ✅ API Route (proxy to SpaceDevs API)
app.get("/api/launches", async (req, res) => {
  try {
    const response = await fetch(
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&ordering=net"
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching launches:", error);
    res.status(500).json({ error: "Failed to fetch launches" });
  }
});

// ✅ Fallback route — handles all other requests
// (Express 5 compatible: using app.use instead of app.get("*"))
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 SpaceRift backend running at http://localhost:${PORT}`);
});

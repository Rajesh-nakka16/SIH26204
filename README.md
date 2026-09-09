# EXPLOREX — AI Tourism Companion

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![React 18](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-green?logo=express)](https://expressjs.com/)

> **"Explore beyond the expected."**  
> A standalone, production-ready AI Trip Planner web application designed with a sleek dark luxury aesthetic, real-time budget distribution, crowd-avoidance intelligence, multilingual companion chat, and offline emergency support.

---

## 🌟 Key Features & Module Overview

1. **Top Navigation & Save Bar**:
   - Compass brand identity (`EXPLOREX — AI TOURISM COMPANION`)
   - Direct section anchors (`Plan`, `Discover`, `Safety`, `My trip`) and dedicated React Router routes (`/planner`, `/destinations`, `/safety`, `/saved`)
   - `Save trip` state persistence with local storage vault and visual confirmation toast

2. **Hero Screen (Explore beyond the expected)**:
   - Dynamic hero imagery with interactive ambient animation
   - 4 Interactive Floating Map Pins (Borra Caves, Mountain Homestay, Coffee Plantations, Galikonda Peak) with hover popovers
   - Live telemetry stats: `₹25,000 Trip budget`, `72% Budget remaining`, `LOW Crowd nearby`, `03 Hidden gems`
   - Feature badge ticker: `Offline mode ready`, `Local experiences`, `Safety, always on`

3. **01 / START HERE — Plan your complete trip**:
   - Starting point, Destination, Travellers, Duration, Budget, and Travel Mood inputs
   - Interactive Route Visualizer with isometric grid and curved trajectory (`HYD` → `ARAKU`, `612 km`)
   - Dynamic `Generate my trip ↗` button with loading feedback

4. **02 / YOUR JOURNEY — Trip Control Center**:
   - Total trip budget progress meter and spend tracker (`₹18,450 spent`)
   - Real-time status indicators: `Offline Map (Downloaded ✓)`, `Crowd Status (34%)`, `Safety (ON)`
   - Color-coded Category Budget Signal Bar Chart with responsive recalculation

5. **03 / MOVE SMART & 04 / REST WELL**:
   - Mode comparison (Train [EXPLOREX PICK], Bus, Car, Flight) with cost, travel time, and comfort levels
   - Curated stay cards with tags (`Best value`, `Low impact`, `Budget pick`), ratings, and `Add to trip +` action

6. **05 / TASTE LOCAL & 06 / STAY CURIOUS**:
   - Authentic tribal dishes and experiences (Famous Bamboo Chicken, Coffee Trail, Tribal Food Market)
   - Crowd-monitored secret viewpoints (Katiki Waterfalls, Galikonda Viewpoint, Sunkarimetta Village)

7. **07 / GO ANOTHER WAY — Avoid the Crowd**:
   - Overcrowded warning monitor for `Borra Caves` (`92% OVERCROWDED`)
   - Live crowd watch alternative switcher (`Chaparai Waterfalls 34%`, `Katiki Waterfalls 28%`, `Hidden Viewpoint 18%`)

8. **08 / THE FLOW — Your AI Itinerary**:
   - 4-day timeline breakdown with timestamps and estimated day expenses
   - `Download offline` export button

9. **09 / Utility Suite (Offline Pack, AI Companion, SOS Emergency)**:
   - **Offline Pack**: One-click offline caching
   - **Multilingual AI Companion**: Interactive travel assistant with English, Telugu (`తెలుగు`), and Hindi (`हिन्दी`)
   - **10 / Travel Safely SOS**: Interactive hold-to-send emergency broadcast modal with coordinates and local police/medical helplines

10. **Final CTA & Footer**:
    - Bottom conversion section and complete footer navigation

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 18
  - Vite 5
  - React Router 6 (SPA routing)
  - Tailwind CSS + Vanilla CSS (custom design system)
  - Lucide React (feather-light modern icons)
  - Axios
- **Backend**:
  - Node.js & Express.js
  - Mongoose & MongoDB (with automatic in-memory fallback)
  - CORS & Dotenv
- **Deployment**:
  - Vercel (configured with `vercel.json` and Serverless API handler)

---

## 📁 Project Structure

```
SIH-204/
├── api/
│   └── index.js                 # Vercel Serverless Function entrypoint
├── client/
│   ├── public/
│   │   └── compass.svg          # Brand mark icon
│   ├── src/
│   │   ├── components/          # Reusable modular UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── PlannerForm.jsx
│   │   │   ├── TripControlCenter.jsx
│   │   │   ├── TransportAndStaySection.jsx
│   │   │   ├── TasteAndDiscoverSection.jsx
│   │   │   ├── CrowdAvoidanceSection.jsx
│   │   │   ├── ItinerarySection.jsx
│   │   │   ├── UtilitySuite.jsx
│   │   │   ├── FinalCTA.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SavedTripsModal.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── data/
│   │   │   └── defaultPlan.js   # Offline datasets & fallback state
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DestinationsPage.jsx
│   │   │   ├── SavedTripsPage.jsx
│   │   │   └── SafetyPage.jsx
│   │   ├── services/
│   │   │   └── api.js           # Defensive API service
│   │   ├── App.css              # Custom styling & animations
│   │   ├── App.jsx              # Main App & Router
│   │   ├── index.css            # Tailwind directives & CSS variables
│   │   └── main.jsx             # React DOM entrypoint
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── server/
│   ├── controllers/
│   │   ├── tripController.js
│   │   └── assistantController.js
│   ├── models/
│   │   └── Trip.js
│   ├── routes/
│   │   ├── tripRoutes.js
│   │   └── assistantRoutes.js
│   ├── package.json
│   └── server.js
├── .env.example
├── .gitignore
├── package.json                 # Root script runner
├── vercel.json                  # Vercel deployment configuration
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies

You can install all dependencies for client and server from the root directory:

```bash
# Install root, client, and server dependencies
npm run install:all
```

Or install separately:

```bash
cd client && npm install
cd ../server && npm install
```

### 2. Run Locally

To start the Vite frontend development server:

```bash
npm run dev
```

The frontend will start on **`http://localhost:3000`** with hot module reloading.

To run both the backend server and frontend concurrently:

```bash
npm run dev:all
```

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5001/api`

---

## ⚡ Zero-Failure Demo Mode

The application is built defensively:
- **No White Screen Guarantee**: If the backend is offline or no database URI is supplied, the client automatically switches to local intelligence mode.
- All forms, planners, crowd alternatives, and chat prompts continue functioning smoothly using realistic offline presets.

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub.
2. Import your project into **Vercel**.
3. Vercel automatically detects the `vercel.json` configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build --prefix client`
   - **Output Directory**: `client/dist`
4. (Optional) Add Environment Variables in your Vercel Project Settings:
   - `MONGODB_URI`: (Optional MongoDB connection string)
   - `AI_API_KEY`: (Optional AI API key)
5. Click **Deploy**. Your application will be live with full SPA routing and serverless backend API!

---

## 📄 License

MIT © 2025 Explorex

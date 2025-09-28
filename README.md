# 🚀 SpaceX Mission Explorer

A React-based web application to explore SpaceX missions using the SpaceX API.  
The app allows users to view launches, filter missions, and see detailed launch information with a clean and responsive UI.

---

## ✨ Features
- Browse upcoming and past SpaceX launches
- View mission details (rocket, date, success/failure, etc.)
- Favorites system using Context API
- Filtering options for easy exploration
- Loading skeletons and fallback UI for better UX
- Fully tested with Vitest + React Testing Library

---

## 🛠️ Tech Stack
- **Frontend:** React + Vite  
- **State Management:** Context API  
- **Styling:** CSS  
- **Testing:** Vitest, React Testing Library  
- **Build Tool:** Vite  
- **Deployment:** Vercel / Netlify / GitHub Pages  

---

## ⚡ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/spacex-mission-explorer.git
cd spacex-mission-explorer
2. Install Dependencies
bash
Copy code
npm install
3. Run the Development Server
bash
Copy code
npm run dev
The app will be available at:
👉 http://localhost:5173

🧪 Running Tests
bash
Copy code
npm test
Tests are written using Vitest + React Testing Library.
They cover components like:

Home.test.jsx

LaunchCard.test.jsx

LaunchDetails.test.jsx

📂 Project Structure
csharp
Copy code
SPACEX-MISSION-EXPLORER
├── src
│   ├── _tests_            # Unit tests
│   │   ├── Home.test.jsx
│   │   ├── LaunchCard.test.jsx
│   │   └── LaunchDetails.test.jsx
│   ├── assets             # Static assets (e.g., react.svg)
│   ├── components         # Reusable UI components
│   │   ├── Filters.jsx
│   │   ├── Home.jsx
│   │   ├── LaunchCard.jsx
│   │   ├── Loader.jsx
│   │   └── SkeletonCard.jsx
│   ├── context            # Favorites context
│   │   └── FavoritesContext.jsx
│   ├── pages              # Application pages
│   │   ├── Home.jsx
│   │   └── LaunchDetails.jsx
│   ├── services           # API/service calls
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── setupTests.js      # Test setup
├── public                 # Public assets
├── package.json           # Dependencies & scripts
├── vite.config.js         # Vite config
├── eslint.config.js       # ESLint config
├── App.css
├── index.css
├── index.html
└── README.md

⚠️ Known Limitations
Only covers basic mission data from SpaceX API (can be extended for more info).

No advanced caching mechanism (relies on live API calls).

Works best with a stable internet connection.

🚀 Future Improvements
Add search functionality

Enhance UI with charts (e.g., launch success rates)

Add pagination for mission lists

Offline support with service workers

🌐 Live Demo
🔗 Live Demo Link
(Update this once deployed to Vercel, Netlify, or GitHub Pages)
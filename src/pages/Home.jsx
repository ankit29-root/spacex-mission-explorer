import React, { useEffect, useState, useMemo } from "react";
import { getAllLaunches } from "../services/launchService";
import LaunchCard from "../components/LaunchCard";
import SkeletonCard from "../components/SkeletonCard"; // Skeleton loader
import { useFavorites } from "../context/FavoritesContext"; // Favorites context
import Filters from "../components/Filters"; // ✅ Reusable Filters component
import "../index.css";

export default function Home() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [successOnly, setSuccessOnly] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites } = useFavorites();

  // Fetch launches
  useEffect(() => {
    getAllLaunches()
      .then((data) => setLaunches(data))
      .catch((err) => setError(err.message || "Failed to fetch launches"))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Memoized filtered launches
  const filteredLaunches = useMemo(() => {
    return launches
      .filter((l) =>
        l.mission_name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((l) => !year || new Date(l.date_utc).getFullYear() === +year)
      .filter((l) => !successOnly || l.launch_success === true)
      .filter((l) => !showFavorites || favorites.includes(l.id));
  }, [launches, search, year, successOnly, showFavorites, favorites]);

  return (
    <main className="container">
      <h1 className="page-title">SpaceX Launches</h1>

      {/* Filters Section */}
      <Filters
        search={search}
        setSearch={setSearch} // ✅ Pass plain setter (debounce handled in Filters)
        year={year}
        setYear={setYear}
        successOnly={successOnly}
        setSuccessOnly={setSuccessOnly}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

      {/* Launch Cards / Skeletons */}
      <section className="grid">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : filteredLaunches.length === 0
          ? <p className="center">No launches found 🚀</p>
          : filteredLaunches.map((l) => <LaunchCard key={l.id} launch={l} />)
        }
      </section>

      {/* Error Display */}
      {error && <p className="center error">{error}</p>}
    </main>
  );
}

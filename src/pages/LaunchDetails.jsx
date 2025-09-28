import React, { memo, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLaunchById } from "../services/launchService";
import { useFavorites } from "../context/FavoritesContext";
import confetti from "canvas-confetti";
import Loader from "../components/Loader";
import "../index.css";

function LaunchDetailsComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLaunchById(id)
      .then((data) => setLaunch(data))
      .catch((err) => setError(err.message || "Failed to fetch launch"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFavorite = useCallback(() => {
    if (!launch) return;
    toggleFavorite(launch.id);

    if (!favorites.includes(launch.id)) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ffdd00", "#1f6feb", "#22c55e"],
      });
    }
  }, [launch, toggleFavorite, favorites]);

  const goBack = useCallback(() => navigate(-1), [navigate]);

  if (loading) return <Loader />;
  if (error) return <p className="center error">{error}</p>;
  if (!launch) return <p className="center">Launch not found 🚀</p>;

  const isFav = favorites.includes(launch.id);

  return (
    <main className="container">
      <button className="back" onClick={goBack}>
        ← Back
      </button>

      <div className="detail">
        <div className="detail-header">
          <img
            src={launch.links?.patch?.large || "/default-patch.png"}
            alt={`${launch.mission_name} patch`}
            className="detail-patch"
            onError={(e) => { e.target.src = "/default-patch.png"; }}
          />
          <h2>{launch.mission_name}</h2>
          <button
            className="fav"
            aria-pressed={isFav}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            onClick={handleFavorite}
          >
            {isFav ? "★" : "☆"}
          </button>
        </div>

        <p><strong>Date:</strong> {new Date(launch.date_utc).toLocaleDateString()}</p>
        <p><strong>Rocket:</strong> {launch.rocket?.name || "Unknown"}</p>
        <p>
          <strong>Success:</strong>{" "}
          <span className={launch.launch_success ? "success" : "failed"}>
            {launch.launch_success ? "✅ Success" : "❌ Failed"}
          </span>
        </p>

        <p><strong>Details:</strong> {launch.details || "No description available."}</p>

        <div className="links">
          {launch.links?.webcast && (
            <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer">Watch Webcast</a>
          )}
          {launch.links?.article && (
            <a href={launch.links.article} target="_blank" rel="noopener noreferrer" className="ml">Read Article</a>
          )}
          {launch.links?.wikipedia && (
            <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer" className="ml">Wikipedia</a>
          )}
        </div>
      </div>
    </main>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(LaunchDetailsComponent, () => true);

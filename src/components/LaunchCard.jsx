import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import confetti from "canvas-confetti";
import "../index.css";

function LaunchCard({ launch }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(launch.id);

  const goToDetails = useCallback(() => {
    navigate(`/launch/${launch.id}`);
  }, [navigate, launch.id]);

  const handleFavorite = useCallback(
    (e) => {
      e.stopPropagation(); // Prevent card click
      toggleFavorite(launch.id);

      // Confetti animation only when adding to favorites
      if (!isFav) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#ffdd00", "#1f6feb", "#22c55e"],
        });
      }
    },
    [launch.id, toggleFavorite, isFav]
  );

  return (
    <article className="card">
      <div
        className="card-body"
        onClick={goToDetails}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") goToDetails();
        }}
      >
        <div className="patch-wrapper">
          <img
            src={launch.links?.patch?.small || "/default-patch.png"}
            alt={`${launch.mission_name} patch`}
            className="patch"
            onError={(e) => { e.target.src = "/default-patch.png"; }}
          />
        </div>

        <h3 className="card-title">{launch.mission_name}</h3>
        <p className="muted">Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
        <p className="muted">Rocket: {launch.rocket?.name || "Unknown"}</p>
        <p className={launch.launch_success ? "success" : "failed"}>
          {launch.launch_success ? "Success ✅" : "Failed ❌"}
        </p>
      </div>

      <button
        className="fav"
        aria-pressed={isFav}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        onClick={handleFavorite}
      >
        {isFav ? "★" : "☆"}
      </button>
    </article>
  );
}

export default memo(
  LaunchCard,
  (prevProps, nextProps) =>
    prevProps.launch.id === nextProps.launch.id &&
    prevProps.launch.launch_success === nextProps.launch.launch_success &&
    prevProps.launch.mission_name === nextProps.launch.mission_name &&
    prevProps.launch.rocket?.name === nextProps.launch.rocket?.name &&
    prevProps.launch.links?.patch?.small === nextProps.launch.links?.patch?.small
);

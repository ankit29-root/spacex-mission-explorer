import React from "react";
import "../index.css"; // Ensure CSS is applied

export default function SkeletonCard() {
  return (
    <article className="card skeleton-card">
      <div className="patch-wrapper">
        <div className="patch skeleton-pulse"></div>
      </div>
      <div className="card-body">
        <div className="skeleton-text skeleton-pulse" style={{ width: "60%", height: "18px", marginBottom: "8px" }}></div>
        <div className="skeleton-text skeleton-pulse" style={{ width: "40%", height: "14px", marginBottom: "4px" }}></div>
        <div className="skeleton-text skeleton-pulse" style={{ width: "50%", height: "14px", marginBottom: "4px" }}></div>
        <div className="skeleton-text skeleton-pulse" style={{ width: "30%", height: "16px" }}></div>
      </div>
      <div className="fav skeleton-pulse" style={{ fontSize: "1.5rem" }}></div>
    </article>
  );
}

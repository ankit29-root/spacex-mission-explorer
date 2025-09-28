import React from "react";

export default function Loader() {
  return (
    <div className="loader">
      <div className="spinner" aria-hidden="true" />
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}

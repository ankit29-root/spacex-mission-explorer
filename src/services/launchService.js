// src/services/launchService.js
import axios from "axios";

const BASE = "https://api.spacexdata.com/v4";

// Fetch all launches
export const getAllLaunches = async () => {
  try {
    const res = await axios.get(`${BASE}/launches`);
    // Transform data to match component needs
    return res.data.map((launch) => ({
      id: launch.id,
      mission_name: launch.name,
      launch_success: launch.success,
      date_utc: launch.date_utc,
      rocket: { name: launch.rocket?.name || "Unknown" },
      links: launch.links,
      details: launch.details,
    }));
  } catch (err) {
    console.error("Error fetching launches:", err);
    throw new Error(err.message || "Failed to fetch launches");
  }
};

// Fetch a single launch by ID
export const getLaunchById = async (id) => {
  try {
    const res = await axios.get(`${BASE}/launches/${id}`);
    const launch = res.data;
    // Transform to match LaunchDetail component
    return {
      id: launch.id,
      mission_name: launch.name,
      launch_success: launch.success,
      date_utc: launch.date_utc,
      rocket: { name: launch.rocket?.name || "Unknown" },
      links: launch.links,
      details: launch.details,
    };
  } catch (err) {
    console.error(`Error fetching launch with id ${id}:`, err);
    throw new Error(err.message || "Failed to fetch launch");
  }
};

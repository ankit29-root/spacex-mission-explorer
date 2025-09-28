// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import LaunchCard from './LaunchCard';
import Loader from './Loader';
import Filters from './Filters';

const Home = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const res = await fetch('https://api.spacexdata.com/v4/launches');
        const data = await res.json();
        setLaunches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLaunches();
  }, []);

  const filteredLaunches = launches.filter((launch) => {
    if (filter === 'success') return launch.success;
    if (filter === 'failure') return launch.success === false;
    return true;
  });

  if (loading) return <Loader />;

  return (
    <div>
      <Filters filter={filter} setFilter={setFilter} />
      <div data-testid="launch-list">
        {filteredLaunches.length > 0 ? (
          filteredLaunches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))
        ) : (
          <p>No launches found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

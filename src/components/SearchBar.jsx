import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        onSearch({ lat: parseFloat(lat), lng: parseFloat(lon), placeName: display_name });
      } else {
        alert('No results found');
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
      alert('An error occurred while searching. Please try again.');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a location"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

// import React from 'react';

// const Sidebar = ({ markers, deleteMarker, onDownloadMap, onDownloadStory }) => {
//   const uniqueCountries = new Set(markers.map(marker => marker.placeName.split(',').pop().trim()));
//   const countryCount = uniqueCountries.size;

//   return (
//     <div className="sidebar">
//       <h2>Visited Places</h2>
//       <p>I have travelled to {countryCount} {countryCount === 1 ? 'country' : 'countries'}!</p>
//       <ul>
//         {markers.map((marker, index) => (
//           <li key={index}>
//             <h3>{marker.placeName || 'Unnamed Place'}</h3>
//             <p>Date Visited: {marker.dateVisited || 'Not set'}</p>
//             <p>Notes: {marker.notes || 'No notes'}</p>
//             <button onClick={() => deleteMarker(index)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <div className="download-buttons">
//         <button onClick={onDownloadMap}>Download Map</button>
//         <button onClick={onDownloadStory}>Download Story</button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';

const Sidebar = ({ markers, deleteMarker, onDownloadMap, onDownloadStory, logo }) => {
  const uniqueCountries = new Set(markers.map(marker => marker.placeName.split(',').pop().trim()));
  const countryCount = uniqueCountries.size;

  return (
    <div className="sidebar">
      <h2>Visited Places</h2>
      <p>I have travelled to {countryCount} {countryCount === 1 ? 'country' : 'countries'}!</p>
      <ul>
        {markers.map((marker, index) => (
          <li key={index}>
            <h3>{marker.placeName || 'Unnamed Place'}</h3>
            <p>Date Visited: {marker.dateVisited || 'Not set'}</p>
            <p>Notes: {marker.notes || 'No notes'}</p>
            <button onClick={() => deleteMarker(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="download-buttons">
        <button onClick={onDownloadMap}>Download Map</button>
        <button onClick={onDownloadStory}>Download Story</button>
      </div>
      <img src={logo} alt="Logo" className="sidebar-logo" />
    </div>
  );
};

export default Sidebar;

// import React, { useState, useRef } from 'react';
// import MapComponent from './components/MapComponent';
// import Sidebar from './components/Sidebar';
// import './index.css';
// import html2canvas from 'html2canvas';

// const App = () => {
//   const [markers, setMarkers] = useState([]);
//   const mapRef = useRef(null);
//   const storyRef = useRef(null);

//   const addMarker = (newMarker) => {
//     setMarkers((currentMarkers) => [...currentMarkers, newMarker]);
//   };

//   const updateMarker = (index, updatedMarker) => {
//     setMarkers((currentMarkers) =>
//       currentMarkers.map((marker, i) => (i === index ? updatedMarker : marker))
//     );
//   };

//   const deleteMarker = (index) => {
//     setMarkers((currentMarkers) => currentMarkers.filter((_, i) => i !== index));
//   };

//   const downloadImage = async (element, filename) => {
//     if (!element) {
//       console.error("Element not found");
//       return;
//     }
//     try {
//       const canvas = await html2canvas(element, { useCORS: true, logging: true });
//       const link = document.createElement('a');
//       link.href = canvas.toDataURL('image/jpeg');
//       link.download = filename;
//       link.click();
//     } catch (error) {
//       console.error("Error generating image:", error);
//     }
//   };

//   const handleDownloadMap = async () => {
//     if (mapRef.current) {
//       await downloadImage(mapRef.current, 'map.jpg');
//     }
//   };

//   const handleDownloadStory = async () => {
//     if (storyRef.current) {
//       // Temporarily make the story container visible
//       storyRef.current.style.display = 'block';
//       await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure resources are loaded
//       await downloadImage(storyRef.current, 'story.jpg');
//       // Hide it again after capturing
//       storyRef.current.style.display = 'none';
//     }
//   };

//   return (
//     <div className="app-container">
//       <Sidebar
//         markers={markers}
//         deleteMarker={deleteMarker}
//         onDownloadMap={handleDownloadMap}
//         onDownloadStory={handleDownloadStory}
//       />
//       <div className="map-and-controls" style={{ flexGrow: 1 }} ref={mapRef}>
//         <MapComponent markers={markers} addMarker={addMarker} updateMarker={updateMarker} />
//       </div>
//       <div className="story-container" ref={storyRef} style={{ width: '1080px', height: '1920px', display: 'none', backgroundColor: '#fff', padding: '20px' }}>
//         <h2 style={{ textAlign: 'center' }}>Travel Story</h2>
//         <div style={{ width: '100%', height: '50%', backgroundColor: '#e0e0e0', marginBottom: '20px' }}>
//           <MapComponent markers={markers} addMarker={addMarker} updateMarker={updateMarker} />
//         </div>
//         <div>
//           <p>I have travelled to {markers.length} places!</p>
//           <ul>
//             {markers.map((marker, index) => (
//               <li key={index}>
//                 <strong>{marker.placeName}</strong>: {marker.notes}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useRef } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import './index.css';
import html2canvas from 'html2canvas';

const App = () => {
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const storyRef = useRef(null);
  const [showStoryView, setShowStoryView] = useState(false);

  const addMarker = (newMarker) => {
    setMarkers((currentMarkers) => [...currentMarkers, newMarker]);
  };

  const updateMarker = (index, updatedMarker) => {
    setMarkers((currentMarkers) =>
      currentMarkers.map((marker, i) => (i === index ? updatedMarker : marker))
    );
  };

  const deleteMarker = (index) => {
    setMarkers((currentMarkers) => currentMarkers.filter((_, i) => i !== index));
  };

  const downloadImage = async (element, filename) => {
    if (!element) {
      console.error("Element not found");
      return;
    }
    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        logging: false,
        scale: 2, // sharper image
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg');
      link.download = filename;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleDownloadMap = async () => {
    if (mapRef.current) {
      await downloadImage(mapRef.current, 'map.jpg');
    }
  };

  const handleDownloadStory = async () => {
    setShowStoryView(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Let it render

    const tiles = storyRef.current.querySelectorAll('.leaflet-tile');
    const loadedTiles = Array.from(tiles).filter((tile) => tile.complete);

    if (loadedTiles.length !== tiles.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for tiles
    }

    await downloadImage(storyRef.current, 'story.jpg');
    setShowStoryView(false);
  };

  return (
    <>
      <div className="app-container">
        <Sidebar
          markers={markers}
          deleteMarker={deleteMarker}
          onDownloadMap={handleDownloadMap}
          onDownloadStory={handleDownloadStory}
        />
        <div className="map-and-controls" style={{ flexGrow: 1 }} ref={mapRef}>
          <MapComponent
            markers={markers}
            addMarker={addMarker}
            updateMarker={updateMarker}
          />
        </div>
      </div>

      {/* Story view for download */}
      {showStoryView && (
        <div
          className="story-container"
          ref={storyRef}
          style={{
            width: '1080px',
            height: '1920px',
            backgroundColor: '#f7f7f7',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            fontFamily: 'sans-serif',
          }}
        >
          <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>My Travel Story</h1>

          <div
            style={{
              width: '100%',
              height: '50%',
              border: '2px solid #ccc',
              marginBottom: '30px',
            }}
          >
            <MapComponent
              markers={markers}
              addMarker={() => {}}
              updateMarker={() => {}}
            />
          </div>

          <div style={{ width: '100%', textAlign: 'left' }}>
            <p style={{ fontSize: '18px' }}>
              I have travelled to <strong>{markers.length}</strong> places across{' '}
              <strong>
                {
                  new Set(
                    markers.map((m) =>
                      m.placeName.includes(',') ? m.placeName.split(',').pop().trim() : m.placeName
                    )
                  ).size
                }
              </strong>{' '}
              {markers.length === 1 ? 'country' : 'countries'}!
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              {markers.map((marker, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <strong>{marker.placeName}</strong>: {marker.notes}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
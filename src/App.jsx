
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
//       const canvas = await html2canvas(element, { useCORS: true });
//       const link = document.createElement('a');
//       link.href = canvas.toDataURL('image/jpeg');
//       link.download = filename;
//       link.click();
//     } catch (error) {
//       console.error("Error generating image:", error);
//     }
//   };

//   const handleDownloadMap = () => {
//     if (mapRef.current) {
//       downloadImage(mapRef.current, 'map.jpg');
//     }
//   };

//   const handleDownloadStory = async () => {
//     if (storyRef.current) {
//       // Temporarily set the story container to be visible
//       storyRef.current.style.display = 'block';
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
      const canvas = await html2canvas(element, { useCORS: true, logging: true });
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
    if (storyRef.current) {
      // Temporarily make the story container visible
      storyRef.current.style.display = 'block';
      await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure resources are loaded
      await downloadImage(storyRef.current, 'story.jpg');
      // Hide it again after capturing
      storyRef.current.style.display = 'none';
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        markers={markers}
        deleteMarker={deleteMarker}
        onDownloadMap={handleDownloadMap}
        onDownloadStory={handleDownloadStory}
      />
      <div className="map-and-controls" style={{ flexGrow: 1 }} ref={mapRef}>
        <MapComponent markers={markers} addMarker={addMarker} updateMarker={updateMarker} />
      </div>
      <div className="story-container" ref={storyRef} style={{ width: '1080px', height: '1920px', display: 'none', backgroundColor: '#fff', padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Travel Story</h2>
        <div style={{ width: '100%', height: '50%', backgroundColor: '#e0e0e0', marginBottom: '20px' }}>
          <MapComponent markers={markers} addMarker={addMarker} updateMarker={updateMarker} />
        </div>
        <div>
          <p>I have travelled to {markers.length} places!</p>
          <ul>
            {markers.map((marker, index) => (
              <li key={index}>
                <strong>{marker.placeName}</strong>: {marker.notes}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
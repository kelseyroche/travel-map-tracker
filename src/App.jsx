
// import React, { useState, useRef } from 'react';
// import MapComponent from './components/MapComponent';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import './index.css';
// import html2canvas from 'html2canvas';
// import logo from './assets/map_logo.png';

// const App = () => {
//   const [markers, setMarkers] = useState([]);
//   const mapRef = useRef(null);
//   const storyRef = useRef(null);
//   const [showStoryView, setShowStoryView] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
//       const canvas = await html2canvas(element, {
//         useCORS: true,
//         logging: false,
//         scale: 2,
//       });
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
//     setShowStoryView(true);
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     const tiles = storyRef.current.querySelectorAll('.leaflet-tile');
//     const loadedTiles = Array.from(tiles).filter((tile) => tile.complete);

//     if (loadedTiles.length !== tiles.length) {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//     }

//     await downloadImage(storyRef.current, 'story.jpg');
//     setShowStoryView(false);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   return (
//     <>
//       <Header />
//       <div className="app-container">
//         <Sidebar
//           markers={markers}
//           deleteMarker={deleteMarker}
//           onDownloadMap={handleDownloadMap}
//           onDownloadStory={handleDownloadStory}
//           logo={logo}
//           isOpen={isSidebarOpen}
//           toggleSidebar={toggleSidebar}
//         />
//         <div className="map-and-controls" style={{ flexGrow: 1 }} ref={mapRef}>
//           <MapComponent
//             markers={markers}
//             addMarker={addMarker}
//             updateMarker={updateMarker}
//           />
//         </div>
//       </div>

//       {showStoryView && (
//         <div className="story-container" ref={storyRef}>
//           <h1>My Travel Story</h1>
//           <div className="map-section">
//             <MapComponent
//               markers={markers}
//               addMarker={() => {}}
//               updateMarker={() => {}}
//             />
//           </div>
//           <div className="summary">
//             <p>
//               I have travelled to <strong>{markers.length}</strong> places!
//             </p>
//             <ul>
//               {[...new Set(markers.map((m) => m.placeName.split(',').pop().trim()))].map((country, index) => (
//                 <li key={index}>
//                   <strong>{country}</strong>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default App;

import React, { useState, useRef } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './index.css';
import html2canvas from 'html2canvas';
import logo from './assets/map_logo.png';
import 'leaflet/dist/leaflet.css'

const App = () => {
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const storyRef = useRef(null);
  const [showStoryView, setShowStoryView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        scale: 2,
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
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const tiles = storyRef.current.querySelectorAll('.leaflet-tile');
    const loadedTiles = Array.from(tiles).filter((tile) => tile.complete);

    if (loadedTiles.length !== tiles.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    await downloadImage(storyRef.current, 'story.jpg');
    setShowStoryView(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="app-container">
        <Sidebar
          markers={markers}
          deleteMarker={deleteMarker}
          onDownloadMap={handleDownloadMap}
          onDownloadStory={handleDownloadStory}
          logo={logo}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="map-and-controls" style={{ flexGrow: 1 }} ref={mapRef}>
          <MapComponent
            markers={markers}
            addMarker={addMarker}
            updateMarker={updateMarker}
          />
        </div>
      </div>

      {showStoryView && (
        <div className="story-container" ref={storyRef}>
          <h1>My Travel Story</h1>
          <div className="map-section">
            <MapComponent
              markers={markers}
              addMarker={() => {}}
              updateMarker={() => {}}
            />
          </div>
          <div className="summary">
            <p>
              I have travelled to <strong>{markers.length}</strong> places!
            </p>
            <ul>
              {[...new Set(markers.map((m) => m.placeName.split(',').pop().trim()))].map((country, index) => (
                <li key={index}>
                  <strong>{country}</strong>
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
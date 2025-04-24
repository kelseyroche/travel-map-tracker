// import React from 'react';
// import favicon from '../assets/map_favicon.png'; // Adjust path as needed

// const Header = () => {
//   return (
//     <header className="app-header">
//       <img src={favicon} alt="Favicon" className="app-favicon" />
//       <h1 className="app-title">My Travel Map</h1>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import favicon from '../assets/map_favicon.png'; // Ensure path is correct

const Header = ({ toggleSidebar }) => {
  return (
    <header className="app-header">
      <img src={favicon} alt="Favicon" className="app-favicon" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
      <h1 className="app-title">My Travel Map</h1>
    </header>
  );
};

export default Header;
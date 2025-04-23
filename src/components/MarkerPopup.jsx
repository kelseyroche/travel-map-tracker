

// import React, { useState } from 'react';

// const MarkerPopup = ({ marker, onUpdate, onDelete }) => {
//   const [formData, setFormData] = useState({
//     placeName: marker.placeName || '',
//     dateVisited: marker.dateVisited || '',
//     notes: marker.notes || ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           Place Name:
//           <input type="text" name="placeName" value={formData.placeName} onChange={handleChange} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Date Visited:
//           <input type="date" name="dateVisited" value={formData.dateVisited} onChange={handleChange} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Notes:
//           <textarea name="notes" value={formData.notes} onChange={handleChange} />
//         </label>
//       </div>
//       <button type="submit">Save</button>
//       <button type="button" onClick={onDelete} style={{ marginLeft: '10px' }}>Delete</button>
//     </form>
//   );
// };

// export default MarkerPopup;

import React, { useState } from 'react';

const MarkerPopup = ({ marker, onUpdate }) => {
  const [formData, setFormData] = useState({
    placeName: marker.placeName || '',
    dateVisited: marker.dateVisited || '',
    notes: marker.notes || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Place Name:
          <input type="text" name="placeName" value={formData.placeName} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Date Visited:
          <input type="date" name="dateVisited" value={formData.dateVisited} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Notes:
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default MarkerPopup;
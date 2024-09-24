import { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';

const AccomodationMap = ({ accommodations }) => {
  const [hoveredAccommodation, setHoveredAccommodation] = useState(null); 

  return (
    <>
      {accommodations.map((accommodation, index) => (
        <Marker
          key={index}
          latitude={parseFloat(accommodation.latitude)}
          longitude={parseFloat(accommodation.longitude)}
          anchor="bottom"
        >
          <div
            className="w-8 h-8 bg-cover cursor-pointer"
            style={{ backgroundImage: "url('/hotelicon.png')" }}
            onMouseEnter={() => setHoveredAccommodation(accommodation)} 
            onMouseLeave={() => setHoveredAccommodation(null)}  
          />
        </Marker>
      ))}

      {hoveredAccommodation && (
        <Popup
          latitude={parseFloat(hoveredAccommodation.latitude)}
          longitude={parseFloat(hoveredAccommodation.longitude)}
          closeButton={false}
          anchor="top"
        >
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg text-sm font-bold">
            <strong>{hoveredAccommodation.name}</strong><br />  
            <p>{hoveredAccommodation.address}</p>  
          </div>
        </Popup>
      )}
    </>
  );
};

export default AccomodationMap;

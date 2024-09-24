import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';

const PubsMap = ({ pubs }) => {
  const [hoveredPub, setHoveredPub] = useState(null); 

  return (
    <>
      {pubs.map((pub, index) => (
        <Marker
          key={index}
          latitude={parseFloat(pub.latitude)}
          longitude={parseFloat(pub.longitude)}
          anchor="bottom"
        >
          <div
            className="w-8 h-8 bg-no-repeat bg-cover cursor-pointer"
            style={{ backgroundImage: "url('/pubicon.png')" }}
            onMouseEnter={() => setHoveredPub(pub)} 
            onMouseLeave={() => setHoveredPub(null)} 
          />
        </Marker>
      ))}

      {hoveredPub && (
        <Popup
          latitude={parseFloat(hoveredPub.latitude)}
          longitude={parseFloat(hoveredPub.longitude)}
          anchor="top"
          offsetTop={-10}
        >
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg text-sm font-bold">
            <strong>{hoveredPub.pub_name}</strong><br />  
            <p>{hoveredPub.address}</p>  
          </div>
        </Popup>
      )}
    </>
  );
};

export default PubsMap;

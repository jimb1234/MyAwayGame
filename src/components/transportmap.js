import { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';

const TransportMap = ({ transportLocations }) => {
  const [hoveredTransport, setHoveredTransport] = useState(null);

  return (
    <>
      {transportLocations.map((transport, index) => (
        <Marker
          key={index}
          latitude={+transport.latitude}
          longitude={+transport.longitude}
          anchor="bottom"
        >
          <div
            className="w-8 h-8 bg-no-repeat bg-cover cursor-pointer"
            style={{ backgroundImage: "url('/transporticon.png')" }}
            onMouseEnter={() => setHoveredTransport(transport)}
            onMouseLeave={() => setHoveredTransport(null)}
          />
        </Marker>
      ))}

      {hoveredTransport && (
        <Popup
          latitude={+hoveredTransport.latitude}
          longitude={+hoveredTransport.longitude}
          onClose={() => setHoveredTransport(null)}
          closeOnClick={false}
          anchor="top"
        >
          <div className="p-2 text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
            {hoveredTransport.name}
          </div>
        </Popup>
      )}
    </>
  );
};

export default TransportMap;

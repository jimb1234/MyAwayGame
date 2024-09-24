import React from 'react';
import Map from 'react-map-gl';
import PubsMap from './pubsmap';  
import TransportMap from './transportmap';  
import AccomodationMap from './accomodationmap';  

const MAPBOX_TOKEN = 'pk.eyJ1IjoiamltbXlnMTIzNDUiLCJhIjoiY20xYjBhYTNlMXY3aTJqczgyYWJwNWNleSJ9.eDn5b-5VTVjvs7RIPuaXSg';

const AwayDayMap = ({
  pubs,
  transportLocations,
  accommodations,
  selectedPub,
  setSelectedPub,
  selectedTransport,
  setSelectedTransport,
  selectedAccommodation,
  setSelectedAccommodation,
}) => {
  const [defaultLat, defaultLng] = pubs.length > 0 ? [pubs[0].latitude, pubs[0].longitude] : [51.5074, -0.1278];

  return (
    <Map
      initialViewState={{
        latitude: parseFloat(defaultLat),
        longitude: parseFloat(defaultLng),
        zoom: 14,
        pitch: 45,
        bearing: -30,
      }}
      style={{ width: '100%', height: '500px' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <PubsMap pubs={pubs} selectedPub={selectedPub} setSelectedPub={setSelectedPub} />
      <TransportMap transportLocations={transportLocations} selectedTransport={selectedTransport} setSelectedTransport={setSelectedTransport} />
      <AccomodationMap accommodations={accommodations} selectedAccommodation={selectedAccommodation} setSelectedAccommodation={setSelectedAccommodation} />
    </Map>
  );
};

export default AwayDayMap;

export const fetchTransportData = async (latitude, longitude) => {
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:2000,51.5549,-0.108436)["railway"="station"];out;
`;

  try {
    const response = await fetch(overpassUrl);
    const data = await response.json();
    return data.elements.map(station => ({
      name: station.tags.name,
      latitude: station.lat,
      longitude: station.lon,
      type: station.tags.station || station.tags.railway, 
    }));
  } catch (error) {
    return [];
  }
};


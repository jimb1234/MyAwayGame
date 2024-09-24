export const fetchAccommodationData = async (latitude, longitude) => {
  const apiKey = '5ae2e3f221c38a28845f05b66985631653b1c2944e6ee80411ce38fe'; 
  const radius = 1000; 

  const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${longitude}&lat=${latitude}&kinds=other_hotels&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching accommodation data');
    }

    const data = await response.json();
    return data.features.map((location) => ({
      name: location.properties.name,
      latitude: location.geometry.coordinates[1],
      longitude: location.geometry.coordinates[0],
      address: location.properties.address,
    }));
  } catch (error) {
    return [];
  }
};

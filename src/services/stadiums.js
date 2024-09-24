export const stadiumCoordinates = {
  'arsenal': { latitude: 51.5549, longitude: -0.108436 },  
  'chelsea': { latitude: 51.4816, longitude: -0.191034 }, 
  'tottenham': { latitude: 51.6043, longitude: -0.066448 }, 
};

export const getStadiumCoordinates = (teamName) => {
  return stadiumCoordinates[teamName.toLowerCase()] || null;
};

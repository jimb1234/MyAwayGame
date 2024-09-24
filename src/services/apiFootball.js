export const fetchTeams = async () => {
  const response = await fetch('http://localhost:5000/api/teams');  
  const data = await response.json();
  return data.response;
};

export const fetchFixturesForTeam = async (teamId) => {
  const response = await fetch(`http://localhost:5000/api/fixtures-for-team?teamId=${teamId}`);  
  const data = await response.json();

  const today = new Date();
  const futureFixtures = data.response.filter((fixture) => {
    const fixtureDate = new Date(fixture.fixture.date);
    return fixtureDate > today;
  });

  return futureFixtures;
};

export const fetchNextGameweekFixtures = async () => {
  const response = await fetch('http://localhost:5000/api/next-gameweek-fixtures'); 
  const data = await response.json();
  return data.response;
};

export const fetchFixtureById = async (fixtureId) => {
  const apiUrl = `http://localhost:5000/api/fixtures?id=${fixtureId}`;  

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching fixture details: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Fixture Details for ID: ${fixtureId}`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching fixture details:`, error);
  }
};

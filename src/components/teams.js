import { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]); 

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/teams`);
        const data = await response.json();
        setTeams(data.teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []); 

  return (
    <div>
      <h1>Premier League Teams</h1>
      <ul>
        {teams.map(team => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;

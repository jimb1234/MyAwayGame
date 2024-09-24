import { useState, useEffect } from 'react';
import { fetchTeams, fetchFixturesForTeam, fetchNextGameweekFixtures } from '../services/apiFootball';  
import TeamList from '../components/TeamList';
import FixtureList from '../components/fixtureList';

const ViewUpcomingMatches = () => {
  const [teams, setTeams] = useState([]);
  const [fixtures, setFixtures] = useState([]);  
  const [selectedTeam, setSelectedTeam] = useState(null); 
  const [view, setView] = useState('teams'); 

  useEffect(() => {
    const loadTeams = async () => {
      const data = await fetchTeams();  
      const sortedTeams = data.sort((a, b) => a.team.name.localeCompare(b.team.name));
      setTeams(sortedTeams || []);
    };
    loadTeams();
  }, []);

  const loadNextGameweekFixtures = async () => {
    const data = await fetchNextGameweekFixtures();
    setFixtures(data || []);
    setSelectedTeam(null);  
  };

  const handleTeamClick = async (teamId) => {
    setSelectedTeam(teamId);  
    const fixturesData = await fetchFixturesForTeam(teamId);
    setFixtures(fixturesData || []);
  };

  const findTeamById = (teamId) => teams.find(team => team.team.id === teamId)?.team;

  const toggleView = () => {
    if (view === 'teams') {
      setView('gameweek');
      loadNextGameweekFixtures(); 
    } else {
      setView('teams');
      setSelectedTeam(null);  
      setFixtures([]); 
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Premier League Matches</h1>

      <div className="mb-8 text-center">
        <button
          onClick={toggleView}
          className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
        >
          {view === 'teams' ? 'View Next Gameweek Fixtures' : 'View Premier League Teams'}
        </button>
      </div>

      {view === 'teams' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <TeamList teams={teams} onTeamClick={handleTeamClick} />
        </div>
      )}

      {view === 'gameweek' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="col-span-full text-2xl font-bold mb-4 text-center">
            Next Gameweek Fixtures
          </h2>
          {fixtures.length > 0 ? (
            <FixtureList
              fixtures={fixtures}
              findTeamById={findTeamById}
            />
          ) : (
            <p>No fixtures available for the next gameweek.</p>
          )}
        </div>
      )}

      {selectedTeam && view === 'teams' && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Fixtures for {findTeamById(selectedTeam)?.name}
          </h2>
          {fixtures.length > 0 ? (
            <FixtureList
              fixtures={fixtures}
              findTeamById={findTeamById}
            />
          ) : (
            <p>No fixtures available for this team.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewUpcomingMatches;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserUpcomingList = ({ games, registeredGames, setRegisteredGames }) => {
  const navigate = useNavigate();

  const handleRegister = (fixture) => {
    const isAlreadyRegistered = registeredGames.some(game => game.fixture.id === fixture.fixture.id);

    if (!isAlreadyRegistered) {
      setRegisteredGames([...registeredGames, fixture]);
      navigate(`/away-day/${fixture.teams.home?.name}`);
    }
  };

  if (!games?.length) {
    return <p>No games registered yet. Register for a game to see it here!</p>;
  }

  return (
    <ul className="space-y-4">
      {games.map((fixture, index) => {
        const { fixture: fixtureInfo, teams } = fixture || {};
        if (!fixtureInfo || !teams) {
          return <li key={index} className="text-gray-400">Loading fixture details...</li>;
        }

        const fixtureDate = new Date(fixtureInfo.date);
        const day = fixtureDate.getDate();
        const month = fixtureDate.toLocaleString('default', { month: 'short' });
        const isRegistered = registeredGames.some(game => game.fixture.id === fixtureInfo.id);

        return (
          <li key={fixtureInfo.id || index} className="bg-gray-100 text-black p-4 rounded-lg shadow-sm flex items-center justify-between">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 px-4 rounded-lg">
              <div className="text-2xl font-bold">{day}</div>
              <div className="text-sm">{month}</div>
            </div>
            <div className="flex-1 px-6">
              <div className="flex items-center justify-center space-x-4">
                <img src={teams.home?.logo} alt={teams.home?.name || 'Home Team'} className="w-10 h-10" />
                <span className="text-lg font-bold">{teams.home?.name || 'Home Team'}</span>
                <span className="mx-4 text-lg">vs</span>
                <img src={teams.away?.logo} alt={teams.away?.name || 'Away Team'} className="w-10 h-10" />
                <span className="text-lg font-bold">{teams.away?.name || 'Away Team'}</span>
              </div>
              <div className="text-center text-gray-700 mt-2">
                {fixtureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {fixtureInfo.venue?.name || 'Venue not available'}
              </div>
              {!isRegistered && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700"
                  onClick={() => handleRegister(fixture)}
                >
                  Register Attendance
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default UserUpcomingList;

import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient'; 
import { fetchFixtureById } from '../services/apiFootball'; 

const Dashboard = () => {
  const [registeredGames, setRegisteredGames] = useState([]);

  useEffect(() => {
    const fetchRegisteredGames = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        return;
      }

      const user = session.user;

      try {
        const { data: registeredGamesData } = await supabase
          .from('user_games')
          .select('game_id')
          .eq('user_id', user.id);

        if (registeredGamesData.length > 0) {
          const gameDetails = await Promise.all(
            registeredGamesData.map((game) => fetchFixtureById(game.game_id))
          );
          setRegisteredGames(gameDetails); 
        }
      } catch (error) {
        console.error('Error fetching registered games:', error);
      }
    };

    fetchRegisteredGames();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

      {registeredGames.length === 0 ? (
        <p>No games registered yet. Register for a game to see it here!</p>
      ) : (
        <ul className="space-y-4">
          {registeredGames.map((game, index) => {
            const fixture = game?.response?.[0]?.fixture;
            const homeTeam = game?.response?.[0]?.teams?.home;
            const awayTeam = game?.response?.[0]?.teams?.away;

            if (!fixture || !homeTeam || !awayTeam) {
              return <li key={index}>Error loading fixture</li>;
            }

            const fixtureDate = new Date(fixture.date);
            const day = fixtureDate.getDate();
            const month = fixtureDate.toLocaleString('default', { month: 'short' });

            return (
              <li key={fixture.id} className="bg-gray-100 text-black p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 px-4 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold">{day}</div>
                  <div className="text-sm">{month}</div>
                </div>

                <div className="flex-1 px-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <img src={homeTeam.logo} alt={homeTeam.name} className="w-10 h-10 object-contain" />
                      <span className="text-lg font-bold">{homeTeam.name}</span>
                    </div>

                    <span className="mx-4 text-lg">vs</span>

                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{awayTeam.name}</span>
                      <img src={awayTeam.logo} alt={awayTeam.name} className="w-10 h-10 object-contain" />
                    </div>
                  </div>

                  <div className="text-center text-gray-700 mt-2">
                    {fixtureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                    - {fixture.venue?.name || 'Venue not available'}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;

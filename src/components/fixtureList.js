import { supabase } from '../services/supabaseClient'; 
import { useNavigate } from 'react-router-dom'; 

const FixtureList = ({ fixtures, findTeamById }) => {
  const navigate = useNavigate(); 

  const handleRegisterAttendance = async (fixtureId, homeTeamName) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return;

    const { error } = await supabase
      .from('user_games')
      .insert([{ user_id: session.user.id, game_id: fixtureId, registered_at: new Date().toISOString() }]);

    if (!error) navigate(`/away-day/${homeTeamName}`);
  };

  return (
    <ul className="space-y-4">
      {fixtures.map((fixture) => {
        const fixtureDate = new Date(fixture.fixture.date);
        const day = fixtureDate.getDate();
        const month = fixtureDate.toLocaleString('default', { month: 'short' });

        return (
          <li key={fixture.fixture.id} className="bg-gray-100 text-black p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 px-4 rounded-lg flex flex-col items-center">
              <div className="text-2xl font-bold">{day}</div>
              <div className="text-sm">{month}</div>
            </div>

            <div className="flex-1 px-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img src={findTeamById(fixture.teams.home.id)?.logo} alt={fixture.teams.home.name} className="w-10 h-10" />
                  <span className="text-lg font-bold">{fixture.teams.home.name}</span>
                </div>

                <span className="mx-4 text-lg">vs</span>

                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">{fixture.teams.away.name}</span>
                  <img src={findTeamById(fixture.teams.away.id)?.logo} alt={fixture.teams.away.name} className="w-10 h-10" />
                </div>
              </div>

              <div className="text-center text-gray-700 mt-2">
                {fixtureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {fixture.fixture.venue?.name || 'Venue not available'}
              </div>
            </div>

            <button
              onClick={() => handleRegisterAttendance(fixture.fixture.id, fixture.teams.home.name)}
              className="ml-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-full"
            >
              Register Attendance
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default FixtureList;

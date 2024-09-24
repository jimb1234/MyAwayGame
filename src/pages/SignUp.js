import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient'; 
import { useNavigate } from 'react-router-dom';

const premierLeagueTeams = [
  "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton & Hove Albion", 
  "Chelsea", "Crystal Palace", "Everton", "Fulham", "Ipswich Town", "Leicester City",
  "Liverpool", "Manchester City", "Manchester United", "Newcastle United", 
  "Nottingham Forest", "Sheffield United", "Tottenham Hotspur", "West Ham United", "Wolverhampton Wanderers"
];

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favouriteTeam, setFavouriteTeam] = useState(''); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate('/dashboard');
    };
    checkUser();
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { error: signUpError, data: signUpData } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (signUpData?.user?.id) {
      const { error: insertError } = await supabase
        .from('Users')
        .insert([{ id: signUpData.user.id, name, email, favourite_team: favouriteTeam }]);

      if (insertError) {
        setError(insertError.message);
      } else {
        navigate('/upcoming-matches');
      }
    } else {
      setError("User creation failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-purple-700">MyAwayGame</h1>
          <p className="mt-2 text-gray-600">Sign Up</p>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
              placeholder="Enter your name" required 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
              placeholder="Enter your email" required 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
              placeholder="Enter your password" required 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="favouriteTeam" className="block text-sm font-medium text-gray-700">Favourite Team</label>
            <select id="favouriteTeam" value={favouriteTeam} onChange={(e) => setFavouriteTeam(e.target.value)} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
              required
            >
              <option value="">Select your favourite team</option>
              {premierLeagueTeams.map(team => <option key={team} value={team}>{team}</option>)}
            </select>
          </div>

          <button type="submit" className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">
            Sign Up
          </button>
        </form>

        {error && <div className="mt-4 text-red-500">{error}</div>}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-purple-600 hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

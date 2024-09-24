import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import LogoutButton from './LogoutButton'; 

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null); 
    };

    checkUser();
  }, []);

  return (
    <nav className="bg-transparent absolute top-0 w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-white">MyAwayGame</Link> 
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-lg text-gray-200 hover:text-white transition">Home</Link>
          <Link to="/leaderboard" className="text-lg text-gray-200 hover:text-white transition">LeaderBoard</Link>
          <Link to="/upcoming-matches" className="text-lg text-gray-200 hover:text-white transition">Matches</Link>
          {user && <Link to="/dashboard" className="text-lg text-gray-200 hover:text-white transition">Dashboard</Link>}
          <Link to="/about-us" className="text-lg text-gray-200 hover:text-white transition">About Us</Link>
        </div>
        
        <div>
          {!user ? (
            <>
              <Link to="/login" className="text-lg text-gray-200 hover:text-white mr-6">Login</Link>
              <Link to="/signup" className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition">Register</Link>
            </>
          ) : (
            <LogoutButton /> 
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

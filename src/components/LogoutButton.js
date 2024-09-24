import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error during logout:', error.message);
    } else {
      navigate('/login'); 
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

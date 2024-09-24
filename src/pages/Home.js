import { Link } from 'react-router-dom';
import Navbar from '../components/navbar'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Navbar />

      <header className="relative bg-cover bg-center h-screen">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto h-full flex items-center justify-center text-center">
          <div className="relative z-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">Experience the Best of Away Days</h1>
            <p className="mt-6 text-lg md:text-2xl text-gray-300">Plan, book, and connect with fellow fans for your next football adventure.</p>
            <Link to="/upcoming-matches" className="mt-8 inline-block bg-blue-600 text-white py-3 px-10 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1">
              View Upcoming Matches
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Why Use MyAwayGame?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4">
                <img src="" alt="Matches" className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Upcoming Matches</h3>
              <p className="mt-2 text-gray-400">Stay up-to-date with the latest fixtures and never miss a game.</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4">
                <img src="" alt="Bookings" className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Book Your Trip</h3>
              <p className="mt-2 text-gray-400">Find the best options for hospitality, transport, and accommodations.</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4">
                <img src="" alt="Community" className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Connect with Fans</h3>
              <p className="mt-2 text-gray-400">Share your experiences and meet other supporters at the game.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="w-2/3 pr-6">
            <h2 className="text-4xl font-bold mb-6">About Us</h2>
            <p className="text-xl mb-12">AwayGame is created by fans, for fans. We understand that organizing an away day can be a challenge, which is why we’re here to simplify the process. Our goal is to curate the ultimate experience for you, bringing fans together and creating unforgettable memories. Let us handle the details so you can focus on enjoying the game.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready for Your Next Away Game?</h2>
        <p className="text-xl mb-12">Join thousands of football fans in planning the perfect match day experience.</p>
        <Link to="/login" className="bg-white text-blue-600 py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105">
          Get Started Now
        </Link>
      </section>

      <footer className="bg-gray-900 py-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500">&copy; 2023 MyAwayGame. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

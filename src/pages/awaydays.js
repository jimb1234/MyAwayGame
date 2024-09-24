import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTransportData } from '../services/transportdata';  
import { fetchAccommodationData } from '../services/accomodationdata';  
import { supabase } from '../services/supabaseClient'; 
import AwayDayMap from '../components/AwayDayMap'; 
import PubList from '../components/PubList';  
import TransportList from '../components/transportList';  
import AccomodationList from '../components/accomodationList';  

const AwayDayPage = () => {
  const { teamName } = useParams();
  const [pubs, setPubs] = useState([]);  
  const [transportLocations, setTransportLocations] = useState([]);  
  const [accommodations, setAccommodations] = useState([]);  

  const [showPubs, setShowPubs] = useState(true);
  const [showTransport, setShowTransport] = useState(true);
  const [showAccommodations, setShowAccommodations] = useState(true);

  const fetchPubsByTeam = async (teamName) => {
    const { data} = await supabase
      .from('pubs')
      .select('pub_name, address, latitude, longitude, website_url, team_name')
      .ilike('team_name', teamName);  
    return data || [];
  };

  useEffect(() => {
    const getData = async () => {
      const fetchedPubs = await fetchPubsByTeam(teamName);
      if (fetchedPubs.length) {
        const { latitude, longitude } = fetchedPubs[0];
        const [fetchedTransport, fetchedAccommodations] = await Promise.all([
          fetchTransportData(latitude, longitude),
          fetchAccommodationData(latitude, longitude),
        ]);
        setPubs(fetchedPubs);
        setTransportLocations(fetchedTransport);
        setAccommodations(fetchedAccommodations);
      }
    };
    if (teamName) getData();
  }, [teamName]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <h1 className="text-white text-4xl text-center font-bold p-6">Away Day for {teamName}</h1>
      
      <div className="bg-white text-center mx-auto py-4 px-8 shadow-lg rounded-lg max-w-4xl">
        <p className="text-xl text-gray-800">
          Explore the best pubs, transport options, and accommodations near the stadium for {teamName}!
        </p>
      </div>
      
      <div className="flex justify-center space-x-4 mb-4 mt-4">
        <label className="text-white">
          <input type="checkbox" checked={showPubs} onChange={() => setShowPubs(!showPubs)} /> Show Pubs
        </label>
        <label className="text-white">
          <input type="checkbox" checked={showTransport} onChange={() => setShowTransport(!showTransport)} /> Show Transport
        </label>
        <label className="text-white">
          <input type="checkbox" checked={showAccommodations} onChange={() => setShowAccommodations(!showAccommodations)} /> Show Accommodations
        </label>
      </div>

      <AwayDayMap
        pubs={showPubs ? pubs : []}
        transportLocations={showTransport ? transportLocations : []}
        accommodations={showAccommodations ? accommodations : []}
      />

      <div className="container mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {showPubs && <PubList pubs={pubs} />}
        {showTransport && <TransportList transportLocations={transportLocations} />}
        {showAccommodations && <AccomodationList accommodations={accommodations} />}
      </div>
    </div>
  );
};

export default AwayDayPage;

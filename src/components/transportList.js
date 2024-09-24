const TransportList = ({ transportLocations }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-blue-600">Transport Options</h2>
    <ul className="space-y-6">
      {transportLocations.map((transport, index) => (
        <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
          <strong className="font-bold text-lg text-purple-800">{transport.name}</strong>
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-6 rounded-lg"
            onClick={() => alert(`Viewing details for: ${transport.name}`)}
          >
            View Details
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default TransportList;

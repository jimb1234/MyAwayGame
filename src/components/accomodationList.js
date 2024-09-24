import React from 'react';

const AccomodationList = ({ accommodations }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-blue-600">Accommodations Near the Stadium</h2>
    <ul className="space-y-6">
      {accommodations.map((accommodation, index) => (
        <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <strong className="font-bold text-lg text-purple-800">{accommodation.name}</strong><br />
            <span className="text-gray-700">{accommodation.address}</span>
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg"
            onClick={() => alert(`Booking accommodation: ${accommodation.name}`)}
          >
            Book Now
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default AccomodationList;

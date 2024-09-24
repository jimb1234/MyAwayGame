import React from 'react';

const PubList = ({ pubs }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-blue-600">Pubs Near the Stadium</h2>
    <ul className="space-y-6">
      {pubs.map((pub, index) => (
        <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <strong className="font-bold text-lg text-purple-800">{pub.pub_name}</strong>
            <br />
            <span className="text-gray-700">{pub.address}</span>
          </div>
          {pub.website_url && (
            <a
              href={pub.website_url} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-6 rounded-lg"
            >
              View
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default PubList;

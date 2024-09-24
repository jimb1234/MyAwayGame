import React from 'react';

const TeamList = ({ teams, onTeamClick }) => {
  return (
    <ul className="space-y-4">
      {teams.map((team) => (
        <li key={team.team.id} className="bg-gray-100 text-black p-4 rounded-lg shadow-sm flex items-center justify-between">
          <button 
            onClick={() => onTeamClick(team.team.id)}
            className="flex items-center space-x-4"
          >
            <img src={team.team.logo} alt={team.team.name} className="w-10 h-10 object-contain" />
            <span>{team.team.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TeamList;

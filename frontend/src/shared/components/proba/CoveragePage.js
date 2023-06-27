import React from 'react';

const CoveragePage = () => {
  const coverages = [
    {
      name: 'Competitions',
      description: 'Information about available competitions',
      icon: 'competition',
    },
    {
      name: 'Matches',
      description: 'Live and historic match data',
      icon: 'matches',
    },
    {
      name: 'Standings',
      description: 'League standings and rankings',
      icon: 'standings',
    },
    {
      name: 'Teams',
      description: 'Team information and details',
      icon: 'teams',
    },
  ];

  return (
    <div className="coverage-page">
      <h1>Football Data API Coverage</h1>
      <div className="coverage-list">
        {coverages.map((coverage, index) => (
          <div className="coverage-item" key={index}>
            <div className="coverage-icon">
              <img src={`${coverage.icon}.png`} alt={coverage.name} />
            </div>
            <div className="coverage-details">
              <h2>{coverage.name}</h2>
              <p>{coverage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoveragePage;

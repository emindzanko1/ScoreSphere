import React from 'react';

const LeagueDetails = ({ match }) => {
  // Retrieve the league ID from the URL parameters
  const leagueId = match.params.id;

  // Fetch the league details based on the leagueId (you can implement this logic)
  // For example, you can use the leagueId to fetch the corresponding league data from an API or local data source

  return (
    <div>
      {/* Display the league details here */}
      {/* For example, you can show the league name, description, matches, etc. */}
    </div>
  );
};

export default LeagueDetails;

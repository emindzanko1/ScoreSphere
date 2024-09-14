import React, { useState } from 'react';
import FilterButton from './FilterButton';
import PinnedSection from './PinnedSection';
import ResultTable from './ResultTable/ResultTable';
import SportLink from './SportLink';
import '../styles/Home.css';

const Home = () => {
  const [matches, setMatches] = useState([]);

  return (
    <>
      <SportLink />
      <main>
        <PinnedSection />
        <div className='wrapper'>
          <div className='main-content'>
            <FilterButton setMatches={setMatches} />
            <ResultTable matches={matches} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

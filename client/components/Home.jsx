import React from 'react';
import FilterButton from './FilterButton';
import PinnedSection from './PinnedSection';
import ResultTable from './ResultTable';
import SportLink from './SportLink';

const Home = () => {
  return (
    <>
      <SportLink />
      <main>
        <PinnedSection />
        <div className='main-content'>
          <FilterButton />
          <ResultTable />
        </div>
      </main>
    </>
  );
};

export default Home;

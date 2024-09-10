import FilterButton from './FilterButton';
import PinnedSection from './PinnedSection';
import ResultTable from './ResultTable';
import SportLink from './SportLink';

export default function Home() {
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
}

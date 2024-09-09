import FilterButton from "./FilterButton";
import PinnedSection from "./PinnedSection";
import SportLink from "./SportLink";

export default function Home() {
  return (
    <>
      <SportLink />
      <main>
        <PinnedSection />
        <FilterButton />
      </main>
    </>
  );
}

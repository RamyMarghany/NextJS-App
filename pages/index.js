import EventsList from "../components/events/events-list";

import { getFeaturedEvents } from "../data/dummy-data";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <>
      <EventsList items={featuredEvents} />
    </>
  );
};

export default HomePage;

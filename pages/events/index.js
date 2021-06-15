// Modules
import { useRouter } from "next/router";

import EventsList from "../../components/events/events-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents, getFilteredEvents } from "../../data/dummy-data";

const AllEventsPage = () => {
  const router = useRouter();
  const allEvents = getAllEvents();
  const findEventHandler = (year, month) => {
    const eventPath = `events/${year}/${month}`;
    router.push(eventPath);
  };
  return (
    <>
      <EventsSearch onSearch={findEventHandler} />
      <EventsList items={allEvents} />
    </>
  );
};

export default AllEventsPage;

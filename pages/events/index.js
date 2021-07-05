// Modules
import { useRouter } from "next/router";

// Components
import EventsList from "../../components/events/events-list";
import EventsSearch from "../../components/events/events-search";

// Helper
import { getAllEvents } from "../../helpers/api-util";

const AllEventsPage = (props) => {
  const router = useRouter();
  const allEvents = props.events;
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

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;

// Modules
import { useRouter } from "next/router";

// Functions
import { getEventById } from "../../data/dummy-data";

// Components
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const Event = () => {
  const router = useRouter();
  const eventId = router.query.eventId;

  const event = getEventById(eventId);

  return (
    <div>
      {event ? (
        <>
          <EventSummary title={event.title} />
          <EventLogistics
            date={event.date}
            address={event.location}
            image={event.image}
            imagAlt={event.title}
          />
          <EventContent>
            <p>{event.description}</p>
          </EventContent>
        </>
      ) : (
        <p>no event found!</p>
      )}
    </div>
  );
};

export default Event;

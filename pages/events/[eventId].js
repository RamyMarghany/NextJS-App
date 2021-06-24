// Functions
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

// Components
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const Event = (props) => {
  const { event } = props;

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

// In this case we need to use static generation because the page event is important to be pre-generated and find by crawlers
export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const selectedEvent = await getEventById(eventId);
  return {
    props: {
      event: selectedEvent,
    },
    revalidate: 30,
  };
}

// Using getStaticPaths because we're in a dynamic page and we need to let NextJS how many instance needed for this dynamic page.
export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default Event;

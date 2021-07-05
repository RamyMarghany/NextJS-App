// Functions
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

// Components
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Comments from "../../components/input/comments";

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
            imageAlt={event.title}
          />
          <EventContent>
            <p>{event.description}</p>
          </EventContent>
          <Comments eventId={event.id} />
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

  // `getStaticProps` should always return a props objects that passed to the component
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

  // `getStaticPaths` should always return a props objects with a params object => return{ props: { params:{.....}}}
  return {
    paths: paths,

    // there are three values for the fallback (false, true, and blocking)
    // false: no more instances in the represented array to render.
    // true: there are more instance to pre-generate on the fly but it will provide a blank page till get the data.
    // blocking: there are more instance to pre-generate on the fly but it will prevent display anything till the whole data content returned.
    fallback: "blocking",
  };
}

export default Event;

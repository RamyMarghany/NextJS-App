// Component
import EventsList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

// Helper
import { getFilteredEvents } from "../../helpers/api-util";

const FilteredEventsPage = (props) => {
  if (props.hasError) {
    return (
      <div className='center'>
        <ErrorAlert>
          <h2 className='center'>
            invalid filter, please adjust your queries!
          </h2>
        </ErrorAlert>
        <Button link='/events'>Show All Events</Button>
      </div>
    );
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className='center'>
        <ErrorAlert>
          <h2 className='center'>not events found for the chosen date!</h2>
        </ErrorAlert>
        <Button link='/events'>Show All Events</Button>
      </div>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventsList items={filteredEvents} />
    </>
  );
};

// Small Note: with `getServerSideProps` not using `getStaticPaths` like `getStaticProps`
export async function getServerSideProps(context) {
  const { params } = context;

  const filteredDate = params.slug;
  const year = +filteredDate[0];
  const month = +filteredDate[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      notFound: true,
      redirect: {
        destination: "/error",
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year,
    month,
  });
  return {
    props: {
      events: filteredEvents,
      date: {
        year: year,
        month: month,
      },
    },
  };
}

export default FilteredEventsPage;

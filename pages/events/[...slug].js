import { useRouter } from "next/router";
import { getFilteredEvents } from "../../data/dummy-data";
import EventsList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filteredDate = router.query.slug;

  if (!filteredDate) {
    return <p className='center'>loading...!</p>;
  }

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

  const filteredEvents = getFilteredEvents({
    year,
    month,
  });

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

  const date = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventsList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;

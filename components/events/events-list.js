// Components
import EventItem from "./event-item";

// Styles
import classes from "./events-list.module.css";

const EventsList = (props) => {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event, index) => (
        <EventItem key={index} {...event} />
      ))}
    </ul>
  );
};

export default EventsList;

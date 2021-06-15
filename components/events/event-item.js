import Button from "../ui/button";
// Icons
import AddressIcon from "../ui/icons/address-icon";
import DateIcon from "../ui/icons/date-icon";
import classes from "./event-item.module.css";

const EventItem = (props) => {
  const { title, image, date, location, id } = props;
  // Date Formatting
  const readableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `events/${id}`;

  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>
              <DateIcon />
              {readableDate}
            </time>
          </div>
          <div className={classes.address}>
            <address>
              <AddressIcon />
              {formattedAddress}
            </address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;

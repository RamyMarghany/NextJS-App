// Module
import Image from "next/image";

// Components
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
      {/* Image NextComponent optimise the image by creating many images dimensions on the fly for many different devices, and caches to use it if another device with the same screen size request them again, change the type of the image to let each browser using its best type, like chrome use webp imag type, plus it implements the image inside the application on lazy-load approach which it means, only download the image if it's needed  */}
      <Image src={"/" + image} alt={title} width={250} height={160} />
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

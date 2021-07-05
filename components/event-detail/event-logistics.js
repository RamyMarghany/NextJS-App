// Module
import Image from "next/image";

// Components
import AddressIcon from "../ui/icons/address-icon";
import DateIcon from "../ui/icons/date-icon";
import LogisticsItem from "./logistics-item";

// Styles
import classes from "./event-logistics.module.css";

function EventLogistics(props) {
  const { date, address, image, imageAlt } = props;

  // Date Formatting
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width={300} height={300} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;

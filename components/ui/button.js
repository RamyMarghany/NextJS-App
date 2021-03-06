// Module
import Link from "next/link";

// Styles
import classes from "./button.module.css";

const Button = (props) => {
  const { link } = props;
  if (link) {
    return (
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
export default Button;

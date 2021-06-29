import Head from "next/head";
import EventsList from "../components/events/events-list";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsletterRegistration from "../components/input/newsletter-registration";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Events</title>
        <meta name='description' content='many events are coming' />
      </Head>
      <NewsletterRegistration />
      <EventsList items={props.featuredEvents} />
    </>
  );
};

// In this case we are using static generation approach by using (getStaticProps) function, because for the landing page it's make more sense to pre-generate for the users and doesn't make sense to make on server-side rendering because we don't need to re-generate the page with each request
export async function getStaticProps() {
  const allFeaturedEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: allFeaturedEvents,
    },
    // re-generate(update) the page each every hour, unless we have to re-build and re-deploy the whole app to update this page.
    revalidate: 3600,
  };
}

export default HomePage;

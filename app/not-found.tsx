import { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "We are sorry, curent page was not found",
  openGraph: {
    title: "Notehub",
    description: "We are sorry, curent page was not found",
    url: "https://07-routing-nextjs-rust-nu.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;

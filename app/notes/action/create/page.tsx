import { Metadata } from "next";
import CreateNoteClient from "./CreateNote.client";

export const metadata: Metadata = {
  title: "Create note",
  description: "Create new note on a dashboard",
  openGraph: {
    title: "Create note",
    description: "Create new note on a dashboard",
    url: "https://07-routing-nextjs-rust-nu.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create note",
      },
    ],
  },
};

const CreateNote = () => {
  return <CreateNoteClient />;
};

export default CreateNote;
